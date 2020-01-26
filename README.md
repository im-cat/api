# munchkin
- I'm cat API Server

## API docs
- [WIKI](https://github.com/im-cat/munchkin/wiki) 

## Playing locally

로컬에서 띄우기 위해 준비해야 할 것은 다음과 같습니다.
- Docker Image
- docker-compose.yml 파일
- .env 파일

도커 이미지 빌드

```shell script
docker build . -t munchkin:latest
```

docker-compose.yml 파일은 docker-compose.example.yml 파일을 복사하세요.

```shell script
cp docker-compose.example.yml docker-compose.yml
```

.env 파일은 .env.example 파일을 복사하세요.

```shell script
cp .env.example .env
```

이제 준비가 되었습니다. 다음 명령어를 타이핑 하세요.

````shell script
docker-compose up
````

## Branches

test(npm run test), lint(npm run lint)는 커밋 전에 로컬에서 하신 후에 push 하시는 것을 추천합니다.

- dev: default branch 개발 브랜치 입니다. 개발은 이 브랜치에서 해주세요.
- master: production branch

## Directory structure

```
└── src
    └── api
        ├── common
        │   ├── jwt
        │   ├── passport
        │   └── response
        ├── config
        │   ├── express
        │   └── sequelize
        ├── core
        │   ├── article
        │   │   ├── application
        │   │   ├── domain
        │   │   ├── infrastructure
        │   │   └── models
        │   └── member
        │       ├── application
        │       ├── domain
        │       ├── infrastructure
        │       └── models
        └── web
            ├── article
            ├── auth
            └── member
```
