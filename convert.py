import xml.etree.ElementTree as ET
import json
import os
import glob
from shapely.geometry import LineString
from shapely.ops import transform
import pyproj

# 1. XMLファイルの探索
folder_path = "海岸線データ"
xml_files = glob.glob(os.path.join(folder_path, "*.xml")) or glob.glob("*.xml")

if not xml_files:
    print("エラー: XMLファイルが見つかりません。")
    exit()

xml_file = xml_files[0]
print(f"読み込み対象ファイル: {xml_file}")

tree = ET.parse(xml_file)
root = tree.getroot()
ns = {'gml': 'http://www.opengis.net/gml/3.2'}

features = []

# 日本向けの平面直角座標系（EPSG:6677 / IX系: 神奈川県周辺）へ投影変換するトランスフォーマー
project_to_meters = pyproj.Transformer.from_crs("EPSG:4326", "EPSG:6677", always_xy=True).transform
project_to_wgs84 = pyproj.Transformer.from_crs("EPSG:6677", "EPSG:4326", always_xy=True).transform

# 2. 全 Curve を読み込んでバッファー（面）化
for curve in root.findall('.//gml:Curve', ns):
    gml_id = curve.get('{http://www.opengis.net/gml/3.2}id')
    pos_list = curve.find('.//gml:posList', ns)
    
    if pos_list is not None and pos_list.text:
        coords_raw = pos_list.text.strip().split()
        coords = []
        for i in range(0, len(coords_raw), 2):
            lat = float(coords_raw[i])
            lon = float(coords_raw[i+1])
            coords.append((lon, lat))
            
        if len(coords) >= 2:
            line = LineString(coords)
            
            # メートル単位の座標系に変換して 50m 幅のバッファー（砂浜帯）を作成
            line_meters = transform(project_to_meters, line)
            buffer_meters = line_meters.buffer(50)  # ★ 50m幅（必要に応じて変更可）
            
            # 元の GeoJSON用座標系（WGS84）に戻す
            buffer_wgs84 = transform(project_to_wgs84, buffer_meters)
            
            feature = {
                "type": "Feature",
                "properties": {
                    "id": gml_id,
                    "name": "砂浜清掃ゾーン"
                },
                "geometry": buffer_wgs84.__geo_interface__
            }
            features.append(feature)

# 3. GeoJSON として書き出し
geojson_data = {
    "type": "FeatureCollection",
    "features": features
}

with open("coastal_zones.geojson", "w", encoding="utf-8") as f:
    json.dump(geojson_data, f, ensure_ascii=False, indent=2)

print(f"変換成功: 全 {len(features)} 件の砂浜バッファーエリアを coastal_zones.geojson に出力しました！")