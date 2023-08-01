const PORT = 3001;
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const app = express();

// Configuração da View Engine
app.engine('hbs', expressHbs.engine({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(shopRoutes);
app.use('/admin', adminData.routes);

app.use((req, res, next) => {
    res.render('404', {pageTitle: "Não encontrado"})
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});