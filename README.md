# OMA 
#### Online TODO-list application.
`OMA` is an online TODO-list powered by Rails. It has been designed for multi-user editing same list and flexiable for build your own OMA appliction.

## Usage
TODO

## Get Started

### download the project.
via git: 
`git clone https://github.com/TimWei/OMA.git`

mirrors:
1. [Github](https://github.com/TimWei/OMA/archive/master.zip)

### Setup User Authentication
Since default user-authentication using Google Oauth2. you should followed steps in [Google OAuth 2.0 for Client-side Web Applications](https://developers.google.com/identity/protocols/OAuth2UserAgent) for getting Google Oauth Client ID. and put it in `oma_frontend/_data/app.yml` like below:

```yaml
oauth:
  #replace GOOGLE_OAUTH_ID to your google oauth id
  google: 'GOOGLE_OAUTH_ID'
```

### Setup Rails backend
We will use built-in development server, and SQLite3 as database for quick start. you could changing to your favorite Rails stacks depend on needed. 

1. `cd oma_backend`
2. `bundle install`
2. `rake db:migrate`
3. `rails s -b 0.0.0.0`


### Setup frontend
The frontend bundler using Jekyll by default, you should configure application's backend settings first 
`vim oma_frontend/_data/app.yml`

p.s. Rails built-in server will run on 3000 port by default

```yaml
network:
  # backend api setting, replace RAILS_BACKEND_HOST and RAILS_BACKEND_PORT to your real backend server
  host: 'RAILS_BACKEND_HOST'
  port: 'RAILS_BACKEND_PORT'
  #default api path
  api_prefix: '/api/v1'
  cable: '/cable'  
oauth:
  #replace GOOGLE_OAUTH_ID to your google oauth id
  google: 'GOOGLE_OAUTH_ID'
```

After backend configuration was done. easily build application by 

1. `cd oma_frontend`
2. `jekyll build` 
and application with assets will generating at `oma_frontend/_site`
If you dont have web server for hosting statics, There is also built-in web server in Jekyll by:
`jekyll serve`

If all these steps finished in right way. OMA is ready for use!

## Production Mode
As we using built-in server for quick start, you might want to setup production configuration for both performance and security.here are some suggestion you could following:
### Database
TODO
### Rails Production Secret
TODO
### Web Server
TODO


## Create your own OMA appliction?
You could integrating favorite social network sign-in in user authentication module. or replace front-end bundler from Jekyll to Webpack depend on your needed. changing every module in project is possible:
![architecture](https://raw.githubusercontent.com/TimWei/OMA/master/doc/images/architecture.png)
