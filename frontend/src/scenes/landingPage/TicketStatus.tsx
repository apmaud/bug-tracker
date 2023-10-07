import BlockBox from '@/components/BlockBox'
import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { Cell, Pie, PieChart } from 'recharts'

const TicketStatus = ({tickets}) => {
  const { palette } = useTheme()
  const data = tickets
  const newT = data.filter(({status}) => status === 'New').length
  const assigned = data.filter(({status}) => status === 'Assigned').length
  const inProgress = data.filter(({status}) => status === 'In Progress').length
  const pending = data.filter(({status}) => status === 'Pending').length
  const resolved = data.filter(({status}) => status === 'Resolved').length
  const pieData = [
    { name: "New", value: newT},
    { name: "Assigned", value: assigned},
    { name: "In Progress", value: inProgress},
    { name: "Pending", value: pending},
    { name: "Resolved", value: resolved},
  ]
  const pieColors = [palette.primary[800], palette.primary[700], palette.primary[600], palette.primary[500], palette.primary[400]];
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
            gridArea="c"
        >
          <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          >
            <Typography paddingTop="1rem" variant="h3" fontSize="18px">Ticket Status</Typography>
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

export default TicketStatus