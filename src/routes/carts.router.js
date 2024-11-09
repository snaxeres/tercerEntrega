import { Router } from 'express';
import Cart from '../services/models/Cart.js';


const router = Router();

router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find().populate('products.product');
    res.render('carts', { carts }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate('products.product');
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const newCart = new Cart({ products: [] });
    await newCart.save();
    res.status(201).json(newCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findById(req.params.id);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    const productExists = cart.products.find(p => p.product.toString() === productId);
    if (productExists) {
      productExists.quantity += 1; 
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id);
    if (!deletedCart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(deletedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
