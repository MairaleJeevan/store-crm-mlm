const supabase =
    require('../config/supabase');

    

const createTarget = async (req, res) => {

    try {

        const {
            user_id,
            month,
            target_amount
        } = req.body;

        const { data, error } =
            await supabase
                .from('sales_targets')
                .insert([{
                    user_id,
                    month,
                    target_amount
                }])
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

const getTargets = async (req, res) => {

    try {

        const { data, error } =
            await supabase
                .from('sales_targets')
                .select('*');

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

const updateAchievedTarget = async (
    userId,
    saleAmount
) => {

    const currentMonth =
        new Date().toLocaleString(
            'en-US',
            {
                month: 'long',
                year: 'numeric'
            }
        );

    const { data: targets } =
        await supabase
            .from('sales_targets')
            .select('*')
            .eq('user_id', userId)
            .eq('month', currentMonth);

    if (
        targets &&
        targets.length > 0
    ) {

        const target =
            targets[0];

        await supabase
            .from('sales_targets')
            .update({
                achieved_amount:
                    Number(
                        target.achieved_amount
                    ) +
                    Number(
                        saleAmount
                    )
            })
            .eq(
                'id',
                target.id
            );
    }
};

module.exports = {
    createTarget,
    getTargets,
    updateAchievedTarget
};