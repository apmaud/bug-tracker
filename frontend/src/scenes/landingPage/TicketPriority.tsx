import BlockBox from '@/components/BlockBox'
import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { Cell, Pie, PieChart } from 'recharts'

const TicketPriority = ({tickets}) => {
  const { palette } = useTheme()
  const data = tickets
  const high = data.filter(({priority}) => priority === 'High').length
  const medium = data.filter(({priority}) => priority === 'Medium').length
  const low = data.filter(({priority}) => priority === 'Low').length
  const pieData = [
    { name: "High", value: high},
    { name: "Medium", value: medium},
    { name: "Low", value: low},
  ]
  const pieColors = [palette.primary[800], palette.primary[500], palette.primary[200]];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    if (pieData[index].value > 0) {
      return (
        <text x={x} y={y} fill={palette.secondary.main} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${pieData[index].name} ${(percent * 100).toFixed(0)}%`}
        </text>
      );
    }
    else {
      return
    }
  };
  return (
    <>
        <BlockBox
            gridArea="b"
        >
          <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          >
            <Typography paddingTop="1rem" variant="h3" fontSize="18px">Ticket Priority</Typography>
            <Box mt="0.25rem" gap="1.5rem" pr="1rem">
              <PieChart
                width={240}
                height={150}
                margin={{
                  top: 0,
                  right: -10,
                  left: 10,
                  bottom: 0,
                }}
                >
                <Pie
                  stroke="none"
                  data={pieData}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                  label={renderCustomizedLabel}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </Box>
          </Box>

        </BlockBox>
    </>
  )
}

export default TicketPriority