const Koa = require("koa");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const { koaSwagger } = require("koa2-swagger-ui");
const swaggerSpec = require("./config/swagger");
const sequelize = require("./config/db");
const errorMid = require("./middleware/error");
const routes = require("./routes");

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());
app.use(errorMid);

router.get("/docs", koaSwagger({ swaggerOptions: { spec: swaggerSpec } }));

routes(router);
app.use(router.routes()).use(router.allowedMethods());

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("数据库连接成功");
  } catch (error) {
    console.log("数据库连接失败（请确保MySQL服务已启动）:", error.message);
  }
})();

app.listen(3000, () => {
  console.log("服务已启动：http://localhost:3000");
  console.log("接口文档：http://localhost:3000/docs");
});