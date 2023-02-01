import { Sequelize } from "sequelize";
import express from "express"

const PORT = 4000;


const app = express()
app.use(express.json())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});

const DB_NAME = 'info'
const USER_NAME = 'root'
const PASSWORD = ''
//const PASSWORD = 'password'

const infoCache = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false
}
})


const Article = infoCache.define('articles', {
    ArticleId: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Tag: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ADate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    Chect: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

const Links = infoCache.define('links', {
    LinkId: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Link: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ADate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    Chect: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})
const Paragraph = infoCache.define('paragraphs', {
    ParagraphId: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Header: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ArticleId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})





Article.hasMany(Paragraph ,{ as: 'Paragraphs' , foreignKey: 'ArticleId'})


/* TEST WORKING SERVER */
app.get('/',(req,res)=>
{
    const check = "Server Is Working (INFO)";
    res.status(200).send(check);
})

app.get('/link' ,async(req, res) => {
    try{
        var links = await Links.findAll() 
        res.json(links);
    }catch(e){
        res.status(500).json(e);
    }
})
app.get('/linkone/:LinkId' ,async(req, res) => {
    try{
        const LinkId = req.params.LinkId
        const links = await Links.findOne({
            where:{
                LinkId:LinkId
            }
        })
        res.json(links);
    }catch(e){
        res.status(500).json(e);
    }
})
app.get('/article/:ArtIndex' ,async(req, res) => {
    try{
        const ArtIndex = req.params.ArtIndex
        var articles 
        if (ArtIndex == 1) {
            articles  = await Article.findAll({
                where:{
                    tag:"допомога"
                }
            }) 
        }
        else if(ArtIndex == 2){
            articles  = await Article.findAll({
                where:{
                    tag:"виїзд"
                }
            }) 
        }
        else{
            res.json("false request")
        }
        res.json(articles);
    }catch(e){
        res.status(500).json(e);
    }
})
app.get('/articleone/:ArticleId' ,async(req, res) => {
    try{
        const ArticleId = req.params.ArticleId
        const bases = await Article.findOne({
            where:{
                ArticleId:ArticleId
            },
            include:[{
                association:'Paragraphs'
            }]
        })
        res.json(bases);
        
    }catch(e){
        res.status(500).json(e);
    }
})
app.post('/article' ,async(req, res) => {
    try{
        const {Tag, Title , Text , Author , Paragraphs}  = req.body;
        const ADate = new Date()
        const Chect = 0
        await Article.create({Tag, Title , Text , Author, ADate, Chect}) 
        const Ptmp = await Article.findOne({
            where:{
                Text:Text
            }, 
        })
        const ArticleId = Ptmp.dataValues.ArticleId
       for (let i = 0; i < Paragraphs.length; i++) {
            const Header = Paragraphs[i].Header
            const Text = Paragraphs[i].Text
            await Paragraph.create({Header,Text,ArticleId}) 
        } 
        res.json("Success");
    }catch(e){
        res.status(500).json(e);
    }
})
app.post('/link' ,async(req, res) => {
    try{
        const { Title, Link , Text , Author }  = req.body;
        const ADate = new Date()
        const Chect = 0
        await Links.create({ Title , Link, Text , Author, ADate, Chect}) 
        res.json("Success");
    }catch(e){
        res.status(500).json(e);
    }
})
app.delete('/article' ,async(req, res) => {
    try{
        const {ArticleId}  = req.body;
        await Article.destroy({
            where:{
                ArticleId:ArticleId
            }
        })
        res.json("Success");
    }catch(e){
        res.status(500).json(e);
    }
})

async function start() {
    try {
      await infoCache.sync()
      app.listen(PORT)
    } catch (e) {
      console.log(e)
    }
  }
  
start()


