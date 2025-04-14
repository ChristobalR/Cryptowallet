"use client"
import { Box, Typography, Paper, Chip, Avatar } from "@mui/material"
import { CheckCircle, Cancel } from "@mui/icons-material"

const WalletHeader = ({ walletName, isActive, onSelect }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        width: "100%",
        height: "70px",
        backgroundColor: "#1c1c1c",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px",
        marginBottom: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
        },
      }}
      onClick={onSelect}
    >
      <Box sx={{ height: "100%", display: "flex", alignItems: "center" }}>
        <Avatar
          src="/2.png"
          alt="Wallet Icon"
          variant="rounded"
          sx={{
            height: "80%",
            width: "auto",
            marginRight: "10px",
            backgroundColor: "transparent",
          }}
        />
        <Typography
          variant="subtitle1"
          sx={{
            color: "#e0e0e0",
            marginLeft: "5px",
            fontWeight: 500,
          }}
        >
          {walletName}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="body2"
          sx={{
            color: "#e0e0e0",
            marginRight: "8px",
          }}
        >
          State:
        </Typography>
        <Chip
          icon={isActive ? <CheckCircle fontSize="small" /> : <Cancel fontSize="small" />}
          label={isActive ? "Active" : "Inactive"}
          size="small"
          sx={{
            backgroundColor: isActive ? "rgba(57, 255, 20, 0.15)" : "rgba(224, 224, 224, 0.15)",
            color: isActive ? "#39ff14" : "#e0e0e0",
            fontWeight: "medium",
            border: isActive ? "1px solid rgba(57, 255, 20, 0.3)" : "1px solid rgba(224, 224, 224, 0.3)",
            "& .MuiChip-icon": {
              color: isActive ? "#39ff14" : "#e0e0e0",
            },
          }}
        />
      </Box>
    </Paper>
  )
}

export default WalletHeader