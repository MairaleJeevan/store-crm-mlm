const bcrypt = require('bcryptjs');
const supabase = require('../config/supabase');

// Get Users
const getUsers = async (req, res) => {
    try {

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .order('created_at', {
                ascending: false
            });

        if (error) throw error;

        return res.json({
            success: true,
            count: data.length,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create User
const createUser = async (req, res) => {
    try {

        const {
            full_name,
            email,
            password,
            role
        } = req.body;

        const password_hash =
            await bcrypt.hash(password, 10);

        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    full_name,
                    email,
                    password_hash,
                    role,
                    is_active: true
                }
            ])
            .select();

        if (error) throw error;

        return res.status(201).json({
            success: true,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update User
const updateUser = async (req, res) => {
    try {

        const { id } = req.params;

        const updateData = {
            ...req.body
        };

        // If password is being updated
        if (req.body.password) {

            updateData.password_hash =
                await bcrypt.hash(
                    req.body.password,
                    10
                );

            delete updateData.password;
        }

        const { data, error } = await supabase
            .from('users')
            .update(updateData)
            .eq('id', id)
            .select();

        if (error) throw error;

        return res.json({
            success: true,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {

        const { id } = req.params;

        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return res.json({
            success: true,
            message: 'User deleted'
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};