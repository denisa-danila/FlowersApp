/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user and return JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Auth token returned
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Managing flower orders
 *   - name: Users
 *     description: User registration and login
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new flower order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - details
 *               - quantity
 *               - address
 *             properties:
 *               details:
 *                 type: string
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders (admin gets all, user gets their own)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, delivered, canceled]
 *         description: Filter orders by status
 *     responses:
 *       200:
 *         description: List of orders
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order data
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /orders/{id}:
 *   patch:
 *     summary: Update an order (only creator or admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, delivered, canceled]
 *               details:
 *                 type: string
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */