import React from 'react';
import { styles } from '../styles/professionalStyles';

function PlanTag({ plan = 'free' }) {
    const getPlanStyle = () => {
        switch(plan) {
            case 'premium':
                return styles.premiumTag;
            case 'pro':
                return styles.proTag;
            default:
                return styles.freeTag;
        }
    };
    return (
        <span style={{...styles.planTag, ...getPlanStyle()}}>
            {plan}
        </span>
    );
};

export default PlanTag;