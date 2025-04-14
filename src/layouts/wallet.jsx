
import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  Divider,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  Collapse,
  Grid,
  Fade,
  Chip,
} from "@mui/material"
import {
  Visibility,
  VisibilityOff,
  ArrowBack,
  Add,
  Close,
  AccountBalanceWallet,
  CalendarToday,
  AttachMoney,
} from "@mui/icons-material"
import Navbar from "../components/navbar"

import WalletHeader from "../components/walletHeader";
import useFetchProfile from "../hooks/useFetchProfile";
import useAddWallet from "../hooks/useAddWallet";
import useBitcoinWalletInfo from "../hooks/fetchWalletInfo"; //


const Profile = () => {
  // Using the existing hooks
  const { userData, error } = useFetchProfile()
  const { newWalletName, setNewWalletName, showForm, setShowForm, handleAddWallet } = useAddWallet()

  const [selectedWallet, setSelectedWallet] = useState(null)
  const [showPrivateKey, setShowPrivateKey] = useState(false)

  // Using the existing Bitcoin wallet info hook
  const {
    balance,
    transactions,
    loading,
    error: walletError,
  } = useBitcoinWalletInfo(selectedWallet ? selectedWallet.publicKey : null)

  // Function to handle going back to wallet list
  const handleBackToList = () => {
    setSelectedWallet(null)
    setShowPrivateKey(false)
  }

  return (
    <>
      <Navbar userData={userData} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Wallet Detail View */}
        {selectedWallet ? (
          <Fade in={Boolean(selectedWallet)} timeout={300}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                backgroundColor: "#2b2b2b",
                borderRadius: "12px",
                width: "100%",
                color: "#ffffff",
              }}
            >
              {/* Header with back button */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <IconButton
                  aria-label="back to wallet list"
                  onClick={handleBackToList}
                  sx={{ color: "#39ff14", mr: 1 }}
                >
                  <ArrowBack />
                </IconButton>
                <Typography variant="h5" component="h1">
                  Detalles de la Wallet
                </Typography>
              </Box>

              <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)", my: 2 }} />

              {/* Wallet Information */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ color: "#999" }}>
                    Nombre
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    {selectedWallet.walletName}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ color: "#999" }}>
                    Llave Pública
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderColor: "rgba(255,255,255,0.1)",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2" sx={{ wordBreak: "break-word", fontFamily: "monospace" }}>
                      {selectedWallet.publicKey}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ color: "#999" }}>
                    Llave Privada
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 1.5,
                        backgroundColor: "rgba(255,255,255,0.05)",
                        borderColor: "rgba(255,255,255,0.1)",
                        borderRadius: 1,
                        flexGrow: 1,
                        mr: 1,
                      }}
                    >
                      <Typography variant="body2" sx={{ wordBreak: "break-word", fontFamily: "monospace" }}>
                        {showPrivateKey ? selectedWallet.privateKey : "••••••••••••••••••••••••••••••••••••••"}
                      </Typography>
                    </Paper>
                    <IconButton
                      aria-label={showPrivateKey ? "hide private key" : "show private key"}
                      onClick={() => setShowPrivateKey((prev) => !prev)}
                      sx={{ color: "#39ff14" }}
                    >
                      {showPrivateKey ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)", my: 2 }} />

              {/* Balance and Transactions */}
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                  <CircularProgress sx={{ color: "#39ff14" }} />
                </Box>
              ) : walletError ? (
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor: "rgba(255,0,0,0.1)",
                    borderRadius: 1,
                    borderLeft: "4px solid #ff4c4c",
                  }}
                >
                  <Typography variant="body1" sx={{ color: "#ff4c4c" }}>
                    Error al obtener los datos: {walletError}
                  </Typography>
                </Paper>
              ) : (
                <>
                  {/* Balance Card */}
                  <Card
                    sx={{
                      backgroundColor: "rgba(57,255,20,0.1)",
                      borderRadius: 2,
                      mb: 3,
                      boxShadow: "none",
                      border: "1px solid rgba(57,255,20,0.2)",
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccountBalanceWallet sx={{ color: "#39ff14", mr: 1 }} />
                        <Typography variant="subtitle1" sx={{ color: "#999" }}>
                          Balance Actual
                        </Typography>
                      </Box>
                      <Typography variant="h4" sx={{ color: "#39ff14", fontWeight: "bold", mt: 1 }}>
                        ${balance} USD
                      </Typography>
                    </CardContent>
                  </Card>

                  {/* Transactions Section */}
                  <Box>
                    <Typography variant="h6" sx={{ color: "#39ff14", mb: 2, display: "flex", alignItems: "center" }}>
                      <AttachMoney sx={{ mr: 1 }} />
                      Últimas Transacciones
                    </Typography>

                    {transactions.length > 0 ? (
                      transactions.map((tx, index) => (
                        <Card
                          key={index}
                          sx={{
                            mb: 1.5,
                            backgroundColor: "rgba(255,255,255,0.05)",
                            boxShadow: "none",
                            borderRadius: 1,
                          }}
                        >
                          <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <AttachMoney sx={{ color: "#39ff14", mr: 1, fontSize: 20 }} />
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                  ${tx.amountUSD} USD
                                </Typography>
                              </Box>
                              <Chip
                                icon={<CalendarToday fontSize="small" />}
                                label={tx.date}
                                size="small"
                                sx={{
                                  backgroundColor: "rgba(255,255,255,0.1)",
                                  color: "#e0e0e0",
                                  "& .MuiChip-icon": { color: "#e0e0e0" },
                                }}
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Box
                        sx={{
                          p: 3,
                          textAlign: "center",
                          backgroundColor: "rgba(255,255,255,0.05)",
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "#999", fontStyle: "italic" }}>
                          No hay transacciones recientes.
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </>
              )}
            </Paper>
          </Fade>
        ) : (
          <>
            {/* Wallet List View */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" component="h1" sx={{ color: "#ffffff", mb: 3, fontWeight: 500 }}>
                <AccountBalanceWallet sx={{ mr: 1, verticalAlign: "middle" }} />
                Mis Wallets
              </Typography>

              {userData && userData.user.wallets && userData.user.wallets.length > 0 ? (
                userData.user.wallets.map((wallet) => (
                  <WalletHeader
                    key={wallet._id}
                    walletName={wallet.walletName}
                    isActive="Active"
                    onSelect={() => setSelectedWallet(wallet)}
                  />
                ))
              ) : (
                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#e0e0e0" }}>No hay wallets disponibles.</Typography>
                  <Typography variant="body2" sx={{ color: "#999", mt: 1 }}>
                    Crea tu primera wallet usando el botón de abajo.
                  </Typography>
                </Paper>
              )}
            </Box>

            {/* Add Wallet Button */}
            <Button
              variant="contained"
              startIcon={showForm ? <Close /> : <Add />}
              sx={{
                backgroundColor: showForm ? "#ff4c4c" : "#39ff14",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: showForm ? "#d32f2f" : "#32d612",
                },
                py: 1,
                px: 2,
              }}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancelar" : "Agregar Wallet"}
            </Button>

            {/* Add Wallet Form */}
            <Collapse in={showForm} sx={{ width: "100%" }}>
              <Paper
                elevation={3}
                sx={{
                  mt: 3,
                  p: 3,
                  backgroundColor: "#2b2b2b",
                  borderRadius: 2,
                  width: "100%",
                  color: "#ffffff",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                  <Add sx={{ mr: 1 }} />
                  Agregar nueva Wallet
                </Typography>

                <TextField
                  label="Nombre de la Wallet"
                  variant="outlined"
                  fullWidth
                  value={newWalletName}
                  onChange={(e) => setNewWalletName(e.target.value)}
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255,255,255,0.2)",
                      },
                      "&:hover fieldset": {
                        borderColor: "#39ff14",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#39ff14",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#999",
                    },
                    "& .MuiInputBase-input": {
                      color: "#fff",
                    },
                  }}
                />

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#39ff14",
                    color: "#ffffff",
                    "&:hover": {
                      backgroundColor: "#32d612",
                    },
                    py: 1,
                    px: 3,
                  }}
                  onClick={handleAddWallet}
                >
                  Crear Wallet
                </Button>
              </Paper>
            </Collapse>
          </>
        )}
      </Container>
    </>
  )
}

export default Profile

