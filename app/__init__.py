from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('config')

db = SQLAlchemy(app)
from app import views,models
from views import AddUser#, imgList
from image_getter import ImageGetter
from getTitle import TitleGet

app.add_url_rule('/api/user/register', view_func=AddUser.as_view('addUser'),
    methods=['POST'])

app.add_url_rule('/api/thumbnails',view_func=ImageGetter.as_view('getImg'),methods=['POST'])

app.add_url_rule('/api/title', view_func=TitleGet.as_view('titleget'),methods=['POST'])
