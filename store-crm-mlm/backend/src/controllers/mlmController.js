// backend/src/controllers/mlmController.js

const supabase = require('../config/supabase');
const generateReferralCode = require('../utils/referralCode');
const bcrypt = require('bcryptjs');

// Register MLM User
const registerMLMUser = async (req, res) => {

    try {

        const {
            full_name,
            email,
            password,
            sponsor_referral_code
        } = req.body;

        let sponsorId = null;
        let level = 1;

        // Check Sponsor
        if (sponsor_referral_code) {

            const {
                data: sponsor,
                error: sponsorError
            } = await supabase
                .from('users')
                .select('*')
                .eq(
                    'referral_code',
                    sponsor_referral_code
                )
                .single();

            if (sponsorError || !sponsor) {

                return res.status(400).json({
                    success: false,
                    message: 'Invalid sponsor referral code'
                });
            }

            sponsorId = sponsor.id;
            level = (sponsor.level || 1) + 1;
        }

        // Check Existing User
        const {
            data: existingUser
        } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .maybeSingle();

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Create Supabase Auth User
        const {
            data: authUser,
            error: authError
        } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true
        });

        if (authError) {
            throw authError;
        }

        // Hash Password for CRM users table
        const hashedPassword =
            await bcrypt.hash(password, 10);

        // Generate Referral Code
        const referralCode =
            generateReferralCode();

        // Insert Into CRM Users Table
        const {
            data,
            error
        } = await supabase
            .from('users')
            .insert([{
                id: authUser.user.id,
                full_name,
                email,
                password_hash: hashedPassword,
                role: 'MLM_USER',
                is_active: true,
                referral_code: referralCode,
                sponsor_id: sponsorId,
                level
            }])
            .select();

        if (error) {
            throw error;
        }

        return res.status(201).json({
            success: true,
            message: 'MLM User Registered Successfully',
            data
        });

    } catch (error) {

        console.error('MLM Registration Error:', error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Downlines
const getDownlines = async (req, res) => {

    try {

        const userId =
            req.params.userId;

        const {
            data,
            error
        } = await supabase
            .from('users')
            .select(`
                id,
                full_name,
                email,
                role,
                referral_code,
                sponsor_id,
                level,
                created_at
            `)
            .eq(
                'sponsor_id',
                userId
            );

        if (error) {
            throw error;
        }

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


// Build Team Tree Recursively
const buildTeamTree = async (userId) => {

    const {
        data: members,
        error
    } = await supabase
        .from('users')
        .select(`
            id,
            full_name,
            email,
            referral_code,
            level
        `)
        .eq('sponsor_id', userId);

    if (error) {
        throw error;
    }

    const result = [];

    for (const member of members) {

        const children =
            await buildTeamTree(member.id);

        result.push({
            ...member,
            downlines: children
        });
    }

    return result;
};

// Get Team Tree
const getTeamTree = async (req, res) => {

    try {

        const userId =
            req.params.userId;

        const tree =
            await buildTeamTree(userId);

        return res.json({
            success: true,
            data: tree
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// MLM Dashboard
const getMLMDashboard = async (req, res) => {

    try {

        const userId = req.params.userId;

        const { data: downlines } =
            await supabase
                .from('users')
                .select('id')
                .eq('sponsor_id', userId);

        const directCount =
            downlines?.length || 0;

        return res.json({
            success: true,
            dashboard: {
                directDownlines:
                    directCount
            }
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    registerMLMUser,
    getDownlines,
    getTeamTree,
    getMLMDashboard
};