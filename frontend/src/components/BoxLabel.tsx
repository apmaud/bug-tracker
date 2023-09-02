import React from 'react'
import FlexBox from './hFlexBox';
import { Box, useTheme, Typography } from '@mui/material'

type Props = {
    title: string;
    sideText: string;
    subtitle?: string;
    icon?: React.ReactNode; // a material ui icon represented by react.reactnode typing
}

const BoxLabel = ({ icon, title, subtitle, sideText }: Props) => {
    const { palette } = useTheme();
    return (
        <FlexBox 
            color={palette.grey[400]} 
            margin="1.5rem 1rem 0 1rem"
        >
            <FlexBox>
                {icon}
                <Box width="100%">
                    <Typography variant="h4" mb="-0.1rem">
                        {title}
                    </Typography>
                    <Typography variant="h6">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBox>
            <Typography variant="h5" fontWeight="700" color={palette.secondary[500]}>
                {sideText}
            </Typography>
        </FlexBox>
    )
}

export default BoxLabel