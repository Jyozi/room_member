1. Slackアプリを作成し、Webhook用URLを作成
2. Google Spread Sheetからスクリプトを作成し、「room_member.gs」をコピぺして、シートIDとシート名を作成したスプレッドシートのものに書き換える
3. スクリプトのWebhook用URLを作成する
4. Slackアプリの叩くURLにスプレッドシートで作成したスクリプトのWebhook用URLを登録する
5. SlackのWebhook用URLをcurlコマンドなどで以下の例のように叩く
```
curl [SlackのWebhook] -d'payload=
{
    "text": "Slack Message Sample Text",
    "attachments": [
        {
            "fallback": "fallback string",
            "title": "title string",
            "callback_id": "callback_id value",
            "color": "#FF0000",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "btn3Name",
                    "text": "btn3",
                    "type": "button",
                    "style":"primary",
                    "value": "btn2Value"
                }
            ]
        }
    ]
}'
```
