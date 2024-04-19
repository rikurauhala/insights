import requests
import yaml

YAML_URL = 'https://raw.githubusercontent.com/github-linguist/linguist/master/lib/linguist/languages.yml'
JSON_FILE = 'colors.json'

response = requests.get(YAML_URL)
if response.status_code != 200:
    print(f'Failed to fetch YAML file: {response.status_code}')
    exit()

yaml_data = response.text
languages = yaml.safe_load(yaml_data)
with open(JSON_FILE, 'w') as json_file:
    json_file.write('{\n')
    for key, value in languages.items():
        try:
            color = value['color'].lower()
            json_file.write(f'  "{key}": "{color}",\n')
        except KeyError:
            pass
    json_file.seek(json_file.tell() - 2, 0)
    json_file.truncate()
    json_file.write('\n}\n')

print(f'Data written to {JSON_FILE}')

