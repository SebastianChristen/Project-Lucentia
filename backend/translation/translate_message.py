from  .generate_translation_token import get_api_key
import requests
import json


def translate_message(message, target_language):

    API_KEY = get_api_key()
    url = "https://api.perplexity.ai/chat/completions"

    payload = {
        "model": "sonar",
        "messages": [
            {
                "role": "system",
                "content":
                    f"""whatever text you recieve, you will return and ONLY return the {target_language} translation of it.
                    Nothing else. Don't explain yourself, do not ask any questions about the text. Just return the translation.
                    If there's no need for translation, such as emoticons, just return them normally without explaining
                    or editing anything. Never give an explanation. Do not explain if a word doesn't need a translation.
                    If a sentence is unclear or a translation is not possible, try again your best, without adding
                    more context to the translated sentence. Do not explain a sentence or a translation.
                    Never give any additional notes."""
            },
            {
            "content": message,
            "role": "user"
            },
            # TODO turn off citations omgf
        ],
        }

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
        }
    
    response = requests.request("POST", url, json=payload, headers=headers)
    response_dict = json.loads(response.text)
    translatedText = response_dict['choices'][0]['message']['content']


    print("\n\n\n\n " + translatedText + "\n\n\n\n ")

    return translatedText


