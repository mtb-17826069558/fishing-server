const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const permission = require("../middleware/permission");
const authCtrl = require("../controllers/auth");
const reservoirCtrl = require("../controllers/reservoir");
const spotCtrl = require("../controllers/spot");
const reservationCtrl = require("../controllers/reservation");
const paymentCtrl = require("../controllers/payment");
const catchCtrl = require("../controllers/catch");
const commentCtrl = require("../controllers/comment");
const roleCtrl = require("../controllers/role");
const userCtrl = require("../controllers/user");

module.exports = (router) => {
  /**
   * @swagger
   * /api/auth/register:
   *   post:
   *     tags: [认证]
   *     summary: 用户注册
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               phone: {type: string, description: "手机号"}
   *               password: {type: string, description: "密码"}
   *               name: {type: string, description: "姓名"}
   *               role: {type: number, description: "角色 0-钓友 1-运营"}
   *     responses:
   *       200:
   *         description: 注册成功
   */
  router.post("/api/auth/register", authCtrl.register);

  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     tags: [认证]
   *     summary: 用户登录
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               phone: {type: string, description: "手机号"}
   *               password: {type: string, description: "密码"}
   *     responses:
   *       200:
   *         description: 登录成功
   */
  router.post("/api/auth/login", authCtrl.login);

  /**
   * @swagger
   * /api/reservoir:
   *   post:
   *     tags: [鱼塘管理]
   *     summary: 创建鱼塘
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name: {type: string, description: "鱼塘名称"}
   *               address: {type: string, description: "地址"}
   *               description: {type: string, description: "描述"}
   *               price_per_hour: {type: number, description: "每小时价格"}
   *               image_url: {type: string, description: "图片URL"}
   *     responses:
   *       200:
   *         description: 创建成功
   */
  router.post("/api/reservoir", auth, permission("reservoir"), reservoirCtrl.create);

  /**
   * @swagger
   * /api/reservoir/my:
   *   get:
   *     tags: [鱼塘管理]
   *     summary: 获取我的鱼塘列表
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: 获取成功
   */
  router.get("/api/reservoir/my", auth, permission("reservoir"), reservoirCtrl.myList);

  /**
   * @swagger
   * /api/reservoir/{id}/spot:
   *   post:
   *     tags: [钓位管理]
   *     summary: 创建钓位
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: 鱼塘ID
   *         schema:
   *           type: number
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               spot_number: {type: number, description: "钓位编号"}
   *               status: {type: string, description: "状态 available/reserved"}
   *               description: {type: string, description: "描述"}
   *     responses:
   *       200:
   *         description: 创建成功
   */
  router.post("/api/reservoir/:id/spot", auth, permission("spot"), spotCtrl.create);

  /**
   * @swagger
   * /api/reservoir/{id}/spots:
   *   get:
   *     tags: [钓位管理]
   *     summary: 获取鱼塘钓位列表
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: 鱼塘ID
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: 获取成功
   */
  router.get("/api/reservoir/:id/spots", spotCtrl.list);

  /**
   * @swagger
   * /api/spot/{id}:
   *   put:
   *     tags: [钓位管理]
   *     summary: 编辑钓位
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: 钓位ID
   *         schema:
   *           type: number
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               spot_num: {type: string, description: "钓位编号"}
   *               price: {type: number, description: "价格"}
   *               status: {type: number, description: "状态 1-可用 0-禁用"}
   *     responses:
   *       200:
   *         description: 修改成功
   */
  router.put("/api/spot/:id", auth, permission("spot"), spotCtrl.update);

  /**
   * @swagger
   * /api/spot/{id}:
   *   delete:
   *     tags: [钓位管理]
   *     summary: 删除钓位
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: 钓位ID
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: 删除成功
   */
  router.delete("/api/spot/:id", auth, permission("spot"), spotCtrl.delete);

  /**
   * @swagger
   * /api/reservation:
   *   post:
   *     tags: [预约管理]
   *     summary: 创建预约
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               spot_id: {type: number, description: "钓位ID"}
   *               start_time: {type: string, description: "开始时间"}
   *               end_time: {type: string, description: "结束时间"}
   *     responses:
   *       200:
   *         description: 创建成功
   */
  router.post("/api/reservation", auth, permission("reservation"), reservationCtrl.create);

  /**
   * @swagger
   * /api/reservation/{id}/verify:
   *   post:
   *     tags: [预约管理]
   *     summary: 核销预约
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: 预约ID
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: 核销成功
   */
  router.post("/api/reservation/:id/verify", auth, permission("reservation"), reservationCtrl.verify);

  /**
   * @swagger
   * /api/payment:
   *   post:
   *     tags: [支付管理]
   *     summary: 创建支付订单
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               reservation_id: {type: number, description: "预约ID"}
   *               payment_method: {type: string, description: "支付方式"}
   *     responses:
   *       200:
   *         description: 创建成功
   */
  router.post("/api/payment", auth, permission("payment"), paymentCtrl.create);

  /**
   * @swagger
   * /api/payment/statistics:
   *   get:
   *     tags: [支付管理]
   *     summary: 获取支付统计
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: 获取成功
   */
  router.get("/api/payment/statistics", auth, permission("payment"), paymentCtrl.statistics);

  /**
   * @swagger
   * /api/catch:
   *   post:
   *     tags: [渔获管理]
   *     summary: 创建渔获记录
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               reservation_id: {type: number, description: "预约ID"}
   *               fish_type: {type: string, description: "鱼类品种"}
   *               weight: {type: number, description: "重量(kg)"}
   *               image_url: {type: string, description: "图片URL"}
   *     responses:
   *       200:
   *         description: 创建成功
   */
  router.post("/api/catch", auth, permission("catch"), catchCtrl.create);

  /**
   * @swagger
   * /api/catch/{id}/recycle:
   *   post:
   *     tags: [渔获管理]
   *     summary: 回收渔获
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: 渔获ID
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: 回收成功
   */
  router.post("/api/catch/:id/recycle", auth, permission("catch"), catchCtrl.recycle);

  /**
   * @swagger
   * /api/comment:
   *   post:
   *     tags: [评论管理]
   *     summary: 创建评论
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               reservoir_id: {type: number, description: "鱼塘ID"}
   *               content: {type: string, description: "评论内容"}
   *               rating: {type: number, description: "评分(1-5)"}
   *     responses:
   *       200:
   *         description: 创建成功
   */
  router.post("/api/comment", auth, permission("comment"), commentCtrl.create);

  /**
   * @swagger
   * /api/reservoir/{id}:
   *   put:
   *     tags: [鱼塘管理]
   *     summary: 编辑水库
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: 水库ID
   *         schema:
   *           type: number
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name: {type: string, description: "水库名称"}
   *               location: {type: string, description: "位置"}
   *               area: {type: number, description: "面积"}
   *               depth_range: {type: string, description: "水深范围"}
   *               fish_types: {type: string, description: "鱼类品种"}
   *               facility: {type: string, description: "设施"}
   *               rules: {type: string, description: "规则"}
   *     responses:
   *       200:
   *         description: 修改成功
   */
  router.put('/api/reservoir/:id', auth, permission("reservoir"), reservoirCtrl.update);

  /**
   * @swagger
   * /api/reservoir/{id}:
   *   delete:
   *     tags: [鱼塘管理]
   *     summary: 删除水库
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: 水库ID
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: 删除成功
   */
  router.delete('/api/reservoir/:id', auth, permission("reservoir"), reservoirCtrl.delete);

  /**
   * @swagger
   * /api/role:
   *   post:
   *     tags: [角色管理]
   *     summary: 创建角色
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name: {type: string, description: "角色名称"}
   *               description: {type: string, description: "描述"}
   *               permissions: {type: string, description: "权限列表JSON"}
   *               status: {type: number, description: "状态 1-启用 0-禁用"}
   *     responses:
   *       200:
   *         description: 创建成功
   */
  router.post("/api/role", auth, admin, roleCtrl.create);

  /**
   * @swagger
   * /api/role:
   *   get:
   *     tags: [角色管理]
   *     summary: 获取角色列表
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: 获取成功
   */
  router.get("/api/role", auth, admin, roleCtrl.list);

  /**
   * @swagger
   * /api/role/{id}:
   *   get:
   *     tags: [角色管理]
   *     summary: 获取角色详情
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: 角色ID
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: 获取成功
   */
  router.get("/api/role/:id", auth, admin, roleCtrl.detail);

  /**
   * @swagger
   * /api/role/{id}:
   *   put:
   *     tags: [角色管理]
   *     summary: 编辑角色
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: 角色ID
   *         schema:
   *           type: number
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name: {type: string, description: "角色名称"}
   *               description: {type: string, description: "描述"}
   *               permissions: {type: string, description: "权限列表JSON"}
   *               status: {type: number, description: "状态 1-启用 0-禁用"}
   *     responses:
   *       200:
   *         description: 修改成功
   */
  router.put("/api/role/:id", auth, admin, roleCtrl.update);

  /**
   * @swagger
   * /api/role/{id}:
   *   delete:
   *     tags: [角色管理]
   *     summary: 删除角色
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: 角色ID
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: 删除成功
   */
  router.delete("/api/role/:id", auth, admin, roleCtrl.delete);

  /**
   * @swagger
   * /api/user:
   *   get:
   *     tags: [人员管理]
   *     summary: 获取用户列表
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: 获取成功
   */
  router.get("/api/user", auth, admin, userCtrl.list);

  /**
   * @swagger
   * /api/user/{id}:
   *   get:
   *     tags: [人员管理]
   *     summary: 获取用户详情
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: 用户ID
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: 获取成功
   */
  router.get("/api/user/:id", auth, admin, userCtrl.detail);

  /**
   * @swagger
   * /api/user/{id}:
   *   put:
   *     tags: [人员管理]
   *     summary: 编辑用户
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: 用户ID
   *         schema:
   *           type: number
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               phone: {type: string, description: "手机号"}
   *               name: {type: string, description: "姓名"}
   *               role: {type: number, description: "角色"}
   *               status: {type: number, description: "状态"}
   *     responses:
   *       200:
   *         description: 修改成功
   */
  router.put("/api/user/:id", auth, admin, userCtrl.update);

  /**
   * @swagger
   * /api/user/{id}:
   *   delete:
   *     tags: [人员管理]
   *     summary: 删除用户
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: 用户ID
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: 删除成功
   */
  router.delete("/api/user/:id", auth, admin, userCtrl.delete);

  /**
   * @swagger
   * /api/user/{id}/enable:
   *   post:
   *     tags: [人员管理]
   *     summary: 启用用户
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: 用户ID
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: 启用成功
   */
  router.post("/api/user/:id/enable", auth, admin, userCtrl.enable);

  /**
   * @swagger
   * /api/user/{id}/disable:
   *   post:
   *     tags: [人员管理]
   *     summary: 禁用用户
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: 用户ID
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: 禁用成功
   */
  router.post("/api/user/:id/disable", auth, admin, userCtrl.disable);
};