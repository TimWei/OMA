# OMA 
#### Online TODO-list application.
`OMA` is an online TODO-list powered by Rails. It has been designed for multi-user editing same TODO list 

## Features
* Social login
![social login](https://raw.githubusercontent.com/TimWei/OMA/master/doc/images/social_login.png)
* Invite link & Activity history
![list page](https://raw.githubusercontent.com/TimWei/OMA/master/doc/images/list_page.png)
* RESTful API

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
The frontend bundler using Jekyll as default. before building you should configure application's backend settings by modified `app.yml`. 

p.s. Rails built-in server will run on 3000 port by default

`vim oma_frontend/_data/app.yml`

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
2. `bundle install`
3. `jekyll build` 
and application with assets will generating at `oma_frontend/_site`
If you dont have web server for hosting statics, There is also built-in web server in Jekyll by:
`jekyll serve`

If all these steps finished in right way. OMA is ready for use!

## Production Mode
As we using built-in server for quick start, you might want to setup production configuration for both performance and security.here are some suggestion you could following:

### Database
You may want to change Database from SQLite to MySQL in production for performance. by following [How To Use MySQL with Your Ruby on Rails Application](https://www.digitalocean.com/community/tutorials/how-to-use-mysql-with-your-ruby-on-rails-application-on-ubuntu-14-04)

### Rails Production Secret
If you run Rails in Production mode without setup production secrets. the error will raised. make sure you've set `SECRET_KEY_BASE` in environment variables.

### Web Server
I recommended Nginx + Passenger for Rails productions. [Introduction to configuring Passenger + Nginx](https://www.phusionpassenger.com/library/config/nginx/intro.html)


## Create your own OMA appliction?
You could integrating favorite social network sign-in in user authentication module. or replace front-end bundler from Jekyll to Webpack depend on your needed. changing every module in project is possible:
![architecture](https://raw.githubusercontent.com/TimWei/OMA/master/doc/images/architecture.png)

## License
OMA is licensed under the MIT license
