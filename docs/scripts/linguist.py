import json
import requests
import yaml

YAML_URL = 'https://raw.githubusercontent.com/github-linguist/linguist/master/lib/linguist/languages.yml'
JSON_FILE = 'colors.json'

response = requests.get(YAML_URL)
if response.status_code != 200:
    print(f'Failed to fetch YAML file: {response.status_code}')
    exit()

data = yaml.safe_load(response.text)

languages = {}

for language, properties in data.items():
    try:
        color = properties['color'].lower()
        languages[language] = color
    except KeyError:
        pass


sorted_languages = {
    language: languages[language] for language in sorted(languages.keys(), key=lambda key: key.lower())
}

with open(JSON_FILE, 'w') as json_file:
    json.dump(sorted_languages, json_file, indent=2)

print(f'Data written to {JSON_FILE}')
