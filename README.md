# Projet Selection Technique CDA
## Installation
Clone the directory, install the dependecy of the project, the database, then start it !
```bash
npm install && npm start
```
## URLS
| Methods | Urls | Actions |
| --- | --- | --- |
| `GET` | /topics | get all topics |
| `GET` | /topics/1 | get topic with id=1 |
| `GET` | /topics/1/post/1 | get post with id=1 of the topic with id=1 |
| `POST` | /topics | post a topic |
| `POST` | /topics/1 | post a post on the topic with id=1 |
| `PUT` | /topics/1 | update title of a topic with id=1 |
| `PUT` | topics/1/posts/1 | update a post with id=1 on the topic with id=1 |
| `DELETE` | /topics | delete all topics |
| `DELETE` | /topics/1 | delete a topic with id=1 |
| `DELETE` | topics/1/posts/1 | delete post with id=1 of topic with id=1 |
