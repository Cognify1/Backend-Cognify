import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

export const register = async (req, res) => {
    try {
        const {name, email, password, role = 'coder'} = req.body;
        if (!name || !email || !password) return res.status(400).json({error: 'Name, email and password are required'});


        const exists = await pool.query('SELECT 1 FROM users WHERE email = $1', [email]);
        if (exists.rowCount) return res.status(409).json({error: 'Email already registered'});

        const hashed = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (name, email, password_hash, role) VALUES ($1,$2,$3,$4) RETURNING user_id, name, email, role',
            [name, email, hashed, role]
        );

        res.status(201).json({user: result.rows[0]});
    } catch (err) {
        console.error('Register error', err);
        res.status(500).json({error: err.message});
    }
};


export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) return res.status(400).json({error: 'Email and password required'});

        const q = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (q.rows.length === 0) return res.status(404).json({error: 'User not found'});

        const user = q.rows[0];
        const ok = await bcrypt.compare(password, user.password_hash);
        if (!ok) return res.status(401).json({error: 'Invalid credentials'});

        const safeUser = {id: user.user_id, name: user.name, email: user.email, role: user.role};
        res.json({user: safeUser});
    } catch (err) {
        console.error('Login error', err);
        res.status(500).json({error: err.message});
    }
};