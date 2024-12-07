# Develop Step

1. Checking doc of Github api
   [search/repository](https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-repositories)
   ,
   [query detail of "search/repository"](https://docs.github.com/en/search-github/searching-on-github/searching-for-repositories)

2. Build env and import third-party, git action, storybook, lint,
   preitter,...etc
3. Build api service and api unit test
4. Build basic architecture & Build state controller
5. Build Search Repository UI, ScrollView with bigdata -> (Virtuoso)
6. Build Detail Repository UI
7. Double check
8. Basically Finish

# Architecture

![Arch Image](/docs/architecture.jpg)

# How to run this project :sunglasses:

Step1

```
npm i
```

Step2 -> for check storybook

```
npm run storybook
```

Step3 -> create -> .env.local -> copy below setting

```
NEXT_PUBLIC_GIT_API_URL="https://api.github.com/"

NEXT_PUBLIC_GIT_TOKEN="PUT YOUR TOKEN AT HERE"

REQUEST_TIMEOUT=10000
```

Step4 -> change Token to your Github Api Token

```
NEXT_PUBLIC_GIT_TOKEN="PUT YOUR TOKEN AT HERE"
```

Step5

```
npm run dev
```

# Introduce of dir

- app // \* Main Pages and App Router
- components // \* Share Component , Page Component
- src // _ Business Logic Layer - share // _ Sharing Things. Ex: Api, Local
  Storage... - search // _ Search page architecture - data // _ Datasource and
  Repository Implement - domain // * Abstract layer - presenter //*state
  controller layer
