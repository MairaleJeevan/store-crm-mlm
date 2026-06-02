const bcrypt = require('bcryptjs');

const supabase = require('../config/supabase');

const { generateToken } = require('../utils/jwt');

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .limit(1);

        if (error) throw error;

        if (!users.length) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials'
            });
        }

        const user = users[0];

        const validPassword = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials'
            });
        }

        const token = generateToken(user);

        return res.status(200).json({
            success: true,
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const register = async (req, res) => {

    try {

        const {
            full_name,
            email,
            password,
            role
        } = req.body;

        const { data: existingUsers } = await supabase
            .from('users')
            .select('id')
            .eq('email', email);

        if (existingUsers.length) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }

        const password_hash = await bcrypt.hash(
            password,
            10
        );

        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    full_name,
                    email,
                    password_hash,
                    role
                }
            ])
            .select();

        if (error) throw error;

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    login,
    register
};