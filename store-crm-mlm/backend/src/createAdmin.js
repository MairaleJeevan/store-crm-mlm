require('dotenv').config();

const bcrypt = require('bcryptjs');

const supabase = require('./config/supabase');

const createAdmin = async () => {

    try {

        const password_hash = await bcrypt.hash(
            'Admin@123',
            10
        );

        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    full_name: 'Super Admin',
                    email: 'admin@crm.com',
                    password_hash,
                    role: 'ADMIN'
                }
            ])
            .select();

        if (error) throw error;

        console.log('Admin Created');

        console.log(data);

        process.exit(0);

    } catch (error) {

        console.error(error);

        process.exit(1);
    }
};

createAdmin();