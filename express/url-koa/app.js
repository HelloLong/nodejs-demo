const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(bodyParser());

router.get('/hello/:name', async(ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.post('/signin', async(ctx, next) => {
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    
    console.log(`signin with name: ${name}, password: ${password}`);
    if(name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1> 
            <p><a href="/">Try again</a></p>`
    }
});

app.use(router.routes());
app.listen(3000);
console.log('app started at port 3000...');