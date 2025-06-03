
/* Librerias
    bcrypt = Encriptacion de contraseñas
    jwt = token para identificaciones
    PrismaCliente = Objeto/Clase para trabajr con Prisma ORM
*/

const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET;


// Si elige registrar --
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // Intonto de creacion de usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'STUDENT'
      }
    });
    res.status(201).json({ message: 'Usuario creado', user });
  } catch (error) {
    res.status(400).json({ error: 'Correo ya registrado' });
  }
};


// Si elige Logearse
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '7d' });
  res.json({ message: 'Login exitoso', token });
};