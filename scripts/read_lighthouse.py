import json

try:
    with open('public/lighthouse_report.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    categories = data.get('categories', {})
    for cat_name, cat_obj in categories.items():
        score = cat_obj.get('score')
        score_100 = round(score * 100) if score is not None else 'N/A'
        print(f"{cat_obj.get('title', cat_name)}: {score_100}/100")
except Exception as e:
    print("Error:", e)
