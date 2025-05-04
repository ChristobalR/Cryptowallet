"use client"

import { useState, useEffect } from "react"
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Box,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
  Paper,
  Avatar,
} from "@mui/material"
import {
  ExpandMore,
  Security,
  Timeline,
  AccountBalanceWallet,
  Notifications,
  Analytics,
  Shield,
  Menu as MenuIcon,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

import useFetchPrices from "../hooks/fetchPrices"

const Landing = () => {
  const { prices, loading, error } = useFetchPrices() // Usar hook real
  const [highlightedPrice, setHighlightedPrice] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const logged = localStorage.getItem("logged") === "true"
  
  console.log(logged)

  const [isLoggedIn, setIsLoggedIn] = useState(logged)

  console.log(isLoggedIn)

  const [userData, setUserData] = useState({ user: { firstName: "Alex" } })

  useEffect(() => {
    const interval = setInterval(() => {
      if (prices && Object.keys(prices).length > 0) {
        setHighlightedPrice(Math.floor(Math.random() * Object.keys(prices).length))
        setTimeout(() => setHighlightedPrice(null), 1000)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [prices])
  const formatPrice = (price) => {
    return Number.parseFloat(price).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }
   const navigate = useNavigate()
  const handleLogin = () => {
    navigate("/login")
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("logged") // opcional, si usas esto también
    window.location.href = "/"
  }

  const handleNavigate = (path) => {
    navigate("/wallet")
    // In a real app, this would use router navigation
  }

  return (
    <Box sx={{ bgcolor: "#121212", minHeight: "100vh", color: "#ffffff" }}>
      {/* Navigation Bar */}
      <AppBar position="sticky" sx={{ bgcolor: "#1E1E1E", boxShadow: 3 }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: "bold", color: "#ffffff" }}>
            Crypto<span style={{ color: "#FF4C29" }}>Tracker</span>
          </Typography>

          {isMobile ? (
            <Button color="inherit" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} sx={{ color: "#ffffff" }}>
              <MenuIcon />
            </Button>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit" onClick={() => handleNavigate("/dashboard")} sx={{ color: "#ffffff" }}>
                Dashboard
              </Button>
              <Button color="inherit" onClick={() => handleNavigate("/market")} sx={{ color: "#ffffff" }}>
                Market
              </Button>
              <Button color="inherit" onClick={() => handleNavigate("/wallet")} sx={{ color: "#ffffff" }}>
                Portfolio
              </Button>
              {isLoggedIn ? (
                <Button
                  variant="contained"
                  onClick={handleLogout}
                  sx={{
                    bgcolor: "#FF4C29",
                    "&:hover": { bgcolor: "#E03E1F" },
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  sx={{
                    bgcolor: "#FF4C29",
                    "&:hover": { bgcolor: "#E03E1F" },
                  }}
                >
                  Login
                </Button>
              )}
            </Box>
          )}
        </Toolbar>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <Box sx={{ bgcolor: "#1E1E1E", p: 2 }}>
            <Button
              fullWidth
              color="inherit"
              onClick={() => handleNavigate("/dashboard")}
              sx={{ justifyContent: "flex-start", py: 1, color: "#ffffff" }}
            >
              Dashboard
            </Button>
            <Button
              fullWidth
              color="inherit"
              onClick={() => handleNavigate("/market")}
              sx={{ justifyContent: "flex-start", py: 1, color: "#ffffff" }}
            >
              Market
            </Button>
            <Button
              fullWidth
              color="inherit"
              onClick={() => handleNavigate("/wallet")}
              sx={{ justifyContent: "flex-start", py: 1, color: "#ffffff" }}
            >
              Portfolio
            </Button>
            {isLoggedIn ? (
              <Button
                fullWidth
                variant="contained"
                onClick={handleLogout}
                sx={{
                  mt: 1,
                  bgcolor: "#FF4C29",
                  "&:hover": { bgcolor: "#E03E1F" },
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                onClick={handleLogin}
                sx={{
                  mt: 1,
                  bgcolor: "#FF4C29",
                  "&:hover": { bgcolor: "#E03E1F" },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        )}
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          background: "linear-gradient(135deg, #1E1E1E 0%, #121212 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  color: "#ffffff",
                }}
              >
                Track Your Crypto <span style={{ color: "#FF4C29" }}>Portfolio</span> in Real-Time
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  color: "#B0B0B0",
                  lineHeight: 1.6,
                }}
              >
                Monitor prices, manage your assets, and stay ahead of the market with our powerful tracking tools.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => handleNavigate("/register")}
                  sx={{
                    py: 1.5,
                    px: 4,
                    bgcolor: "#FF4C29",
                    "&:hover": { bgcolor: "#E03E1F" },
                    fontWeight: "bold",
                  }}
                >
                  Get Started
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => handleNavigate("/learn")}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderColor: "#FF4C29",
                    color: "#FF4C29",
                    "&:hover": {
                      borderColor: "#E03E1F",
                      color: "#E03E1F",
                    },
                    fontWeight: "bold",
                  }}
                >
                  Learn More
                </Button>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
                <Chip
                  label="10,000+ Users"
                  sx={{
                    bgcolor: "rgba(255, 76, 41, 0.1)",
                    color: "#FF4C29",
                    mr: 2,
                  }}
                />
                <Chip
                  label="99.9% Uptime"
                  sx={{
                    bgcolor: "rgba(255, 76, 41, 0.1)",
                    color: "#FF4C29",
                    mr: 2,
                  }}
                />
                <Chip
                  label="Secure"
                  sx={{
                    bgcolor: "rgba(255, 76, 41, 0.1)",
                    color: "#FF4C29",
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  height: { xs: "300px", md: "400px" },
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src="/mobile.png"
                  alt="Cryptocurrency Dashboard"
                  sx={{
                    maxWidth: "100%",
                    height: {xs: "300px", md: "500px"},
                    borderRadius: "12px",
                   
                    transform: "perspective(1000px) rotateY(-10deg)",
                    transition: "transform 0.5s ease",
                    "&:hover": {
                      transform: "perspective(1000px) rotateY(0deg)",
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Live Prices Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{
            mb: 1,
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          Live Cryptocurrency Prices
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            mb: 6,
            color: "#B0B0B0",
          }}
        >
          Real-time updates from the global cryptocurrency markets
        </Typography>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
            <CircularProgress sx={{ color: "#FF4C29" }} />
          </Box>
        )}

        {error && (
          <Typography color="error" align="center" sx={{ my: 4 }}>
            {error}
          </Typography>
        )}

        {prices && (
          <Grid container spacing={3}>
            {Object.entries(prices).map(([key, value], index) => (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Card
                  sx={{
                    bgcolor: "#1E1E1E",
                    borderRadius: "16px",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    height: "100%",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
                    },
                    border: highlightedPrice === index ? "1px solid #FF4C29" : "1px solid transparent",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        src={`/placeholder.svg?height=40&width=40&text=${key.charAt(0).toUpperCase()}`}
                        sx={{
                          bgcolor: "#FF4C29",
                          mr: 2,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#ffffff",
                          textTransform: "capitalize",
                        }}
                      >
                        {key}
                      </Typography>
                    </Box>

                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                        color: "#ffffff",
                        transition: "color 0.5s, transform 0.5s",
                        transform: highlightedPrice === index ? "scale(1.05)" : "scale(1)",
                      }}
                    >
                      ${formatPrice(value.usd)}
                    </Typography>

                   
            
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        mt: 3,
                        borderColor: "#FF4C29",
                        color: "#FF4C29",
                        "&:hover": {
                          borderColor: "#E03E1F",
                          color: "#E03E1F",
                          bgcolor: "rgba(255, 76, 41, 0.1)",
                        },
                      }}
                      onClick={() => handleNavigate(`/crypto/${key}`)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: "#1A1A1A", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            sx={{
              mb: 1,
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            Powerful Features
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            sx={{
              mb: 6,
              color: "#B0B0B0",
            }}
          >
            Everything you need to manage your cryptocurrency portfolio
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  bgcolor: "#242424",
                  borderRadius: "16px",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255, 76, 41, 0.1)",
                      color: "#FF4C29",
                      mr: 2,
                    }}
                  >
                    <Security />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                  >
                    Advanced Security
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ color: "#B0B0B0" }}>
                  Your assets are protected with enterprise-grade security protocols and multi-factor authentication.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  bgcolor: "#242424",
                  borderRadius: "16px",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255, 76, 41, 0.1)",
                      color: "#FF4C29",
                      mr: 2,
                    }}
                  >
                    <Timeline />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                  >
                    Real-Time Tracking
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ color: "#B0B0B0" }}>
                  Monitor cryptocurrency prices in real-time with accurate data from multiple exchanges.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  bgcolor: "#242424",
                  borderRadius: "16px",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255, 76, 41, 0.1)",
                      color: "#FF4C29",
                      mr: 2,
                    }}
                  >
                    <AccountBalanceWallet />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                  >
                    Secure Wallet
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ color: "#B0B0B0" }}>
                  Store and manage your digital assets in our secure, easy-to-use cryptocurrency wallet.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  bgcolor: "#242424",
                  borderRadius: "16px",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255, 76, 41, 0.1)",
                      color: "#FF4C29",
                      mr: 2,
                    }}
                  >
                    <Notifications />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                  >
                    Price Alerts
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ color: "#B0B0B0" }}>
                  Set custom price alerts and get notified when cryptocurrencies reach your target prices.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  bgcolor: "#242424",
                  borderRadius: "16px",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255, 76, 41, 0.1)",
                      color: "#FF4C29",
                      mr: 2,
                    }}
                  >
                    <Analytics />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                  >
                    Advanced Analytics
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ color: "#B0B0B0" }}>
                  Gain insights with detailed charts, historical data, and performance analytics.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  bgcolor: "#242424",
                  borderRadius: "16px",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255, 76, 41, 0.1)",
                      color: "#FF4C29",
                      mr: 2,
                    }}
                  >
                    <Shield />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                  >
                    Privacy Protection
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ color: "#B0B0B0" }}>
                  Your personal information and transaction data are protected with advanced encryption.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                mb: 3,
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              About CryptoTracker
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: "#B0B0B0",
                lineHeight: 1.7,
              }}
            >
              CryptoTracker is a comprehensive cryptocurrency tracking platform designed to help investors monitor their
              digital assets and make informed decisions.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: "#B0B0B0",
                lineHeight: 1.7,
              }}
            >
              Our mission is to provide a secure, reliable, and user-friendly platform for cryptocurrency enthusiasts to
              track their investments and stay updated with the latest market trends.
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
              >
                Our Core Values
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <Chip
                  label="Security"
                  sx={{
                    bgcolor: "rgba(255, 76, 41, 0.1)",
                    color: "#FF4C29",
                    mb: 1,
                  }}
                />
                <Chip
                  label="Transparency"
                  sx={{
                    bgcolor: "rgba(255, 76, 41, 0.1)",
                    color: "#FF4C29",
                    mb: 1,
                  }}
                />
                <Chip
                  label="Innovation"
                  sx={{
                    bgcolor: "rgba(255, 76, 41, 0.1)",
                    color: "#FF4C29",
                    mb: 1,
                  }}
                />
                <Chip
                  label="User Privacy"
                  sx={{
                    bgcolor: "rgba(255, 76, 41, 0.1)",
                    color: "#FF4C29",
                    mb: 1,
                  }}
                />
                <Chip
                  label="Reliability"
                  sx={{
                    bgcolor: "rgba(255, 76, 41, 0.1)",
                    color: "#FF4C29",
                    mb: 1,
                  }}
                />
              </Box>
            </Box>

            <Button
              variant="contained"
              size="large"
              onClick={() => handleNavigate("/about")}
              sx={{
                mt: 2,
                bgcolor: "#FF4C29",
                "&:hover": { bgcolor: "#E03E1F" },
                fontWeight: "bold",
              }}
            >
              Learn More About Us
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                height: { xs: "300px", md: "400px" },
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src="/placeholder.svg?height=400&width=500"
                alt="About CryptoTracker"
                sx={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* FAQ Section */}
      <Box sx={{ bgcolor: "#1A1A1A", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            sx={{
              mb: 1,
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            Frequently Asked Questions
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            sx={{
              mb: 6,
              color: "#B0B0B0",
            }}
          >
            Find answers to common questions about CryptoTracker
          </Typography>

          <Box sx={{ maxWidth: "800px", mx: "auto" }}>
            <Accordion
              sx={{
                bgcolor: "#242424",
                color: "#ffffff",
                mb: 2,
                "&:before": {
                  display: "none",
                },
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: "#FF4C29" }} />}
                sx={{
                  borderLeft: "4px solid #FF4C29",
                  "& .MuiAccordionSummary-content": {
                    my: 2,
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  How do I get started with CryptoTracker?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "#B0B0B0" }}>
                  Getting started is easy! Simply create an account, verify your email, and you can immediately begin
                  tracking cryptocurrency prices. To manage your portfolio, you'll need to add your assets by clicking
                  on the "Add Asset" button in your dashboard.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{
                bgcolor: "#242424",
                color: "#ffffff",
                mb: 2,
                "&:before": {
                  display: "none",
                },
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: "#FF4C29" }} />}
                sx={{
                  borderLeft: "4px solid #FF4C29",
                  "& .MuiAccordionSummary-content": {
                    my: 2,
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Is it safe to store my cryptocurrency information on CryptoTracker?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "#B0B0B0" }}>
                  We use industry-leading security measures including end-to-end encryption and multi-factor
                  authentication to protect your data. We never store your private keys, and all sensitive information
                  is encrypted using advanced protocols.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{
                bgcolor: "#242424",
                color: "#ffffff",
                mb: 2,
                "&:before": {
                  display: "none",
                },
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: "#FF4C29" }} />}
                sx={{
                  borderLeft: "4px solid #FF4C29",
                  "& .MuiAccordionSummary-content": {
                    my: 2,
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  How do I set up price alerts?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "#B0B0B0" }}>
                  To set up price alerts, navigate to the "Alerts" section in your dashboard. Click on "Create New
                  Alert," select the cryptocurrency, set your target price, and choose your notification method (email,
                  SMS, or push notification).
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{
                bgcolor: "#242424",
                color: "#ffffff",
                mb: 2,
                "&:before": {
                  display: "none",
                },
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: "#FF4C29" }} />}
                sx={{
                  borderLeft: "4px solid #FF4C29",
                  "& .MuiAccordionSummary-content": {
                    my: 2,
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Can I track multiple portfolios?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "#B0B0B0" }}>
                  Yes, CryptoTracker allows you to create and manage multiple portfolios. This is perfect for separating
                  your long-term investments from trading accounts or for managing portfolios for different purposes.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{
                bgcolor: "#242424",
                color: "#ffffff",
                "&:before": {
                  display: "none",
                },
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: "#FF4C29" }} />}
                sx={{
                  borderLeft: "4px solid #FF4C29",
                  "& .MuiAccordionSummary-content": {
                    my: 2,
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Is there a mobile app available?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "#B0B0B0" }}>
                  Yes, we offer mobile apps for both iOS and Android devices. You can download them from the App Store
                  or Google Play Store. Our mobile apps provide the same functionality as the web platform, allowing you
                  to track your portfolio on the go.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 10,
          background: "linear-gradient(135deg, #1E1E1E 0%, #121212 100%)",
          position: "relative",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              textAlign: "center",
              p: { xs: 3, md: 6 },
              borderRadius: "16px",
              bgcolor: "#242424",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                mb: 2,
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              Ready to Start Tracking?
            </Typography>

            <Typography
              variant="h6"
              sx={{
                mb: 4,
                color: "#B0B0B0",
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              Join thousands of users who trust CryptoTracker to manage their cryptocurrency portfolios.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => handleNavigate("/register")}
                sx={{
                  py: 1.5,
                  px: 4,
                  bgcolor: "#FF4C29",
                  "&:hover": { bgcolor: "#E03E1F" },
                  fontWeight: "bold",
                }}
              >
                Sign Up Free
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => handleNavigate("/demo")}
                sx={{
                  py: 1.5,
                  px: 4,
                  borderColor: "#FF4C29",
                  color: "#FF4C29",
                  "&:hover": {
                    borderColor: "#E03E1F",
                    color: "#E03E1F",
                    bgcolor: "rgba(255, 76, 41, 0.1)",
                  },
                  fontWeight: "bold",
                }}
              >
                View Demo
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "#121212", py: 6, borderTop: "1px solid #333333" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#ffffff" }}>
                Crypto<span style={{ color: "#FF4C29" }}>Tracker</span>
              </Typography>

              <Typography variant="body2" sx={{ mb: 3, color: "#B0B0B0" }}>
                The most comprehensive cryptocurrency tracking platform for investors and enthusiasts.
              </Typography>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="text"
                  sx={{ minWidth: "auto", color: "#FF4C29" }}
                  onClick={() => handleNavigate("/social/twitter")}
                >
                  Twitter
                </Button>
                <Button
                  variant="text"
                  sx={{ minWidth: "auto", color: "#FF4C29" }}
                  onClick={() => handleNavigate("/social/discord")}
                >
                  Discord
                </Button>
                <Button
                  variant="text"
                  sx={{ minWidth: "auto", color: "#FF4C29" }}
                  onClick={() => handleNavigate("/social/telegram")}
                >
                  Telegram
                </Button>
              </Box>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold", color: "#ffffff" }}>
                Product
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Button
                  variant="text"
                  sx={{
                    justifyContent: "flex-start",
                    color: "#B0B0B0",
                    "&:hover": { color: "#FF4C29" },
                  }}
                  onClick={() => handleNavigate("/features")}
                >
                  Features
                </Button>
                <Button
                  variant="text"
                  sx={{
                    justifyContent: "flex-start",
                    color: "#B0B0B0",
                    "&:hover": { color: "#FF4C29" },
                  }}
                  onClick={() => handleNavigate("/pricing")}
                >
                  Pricing
                </Button>
                <Button
                  variant="text"
                  sx={{
                    justifyContent: "flex-start",
                    color: "#B0B0B0",
                    "&:hover": { color: "#FF4C29" },
                  }}
                  onClick={() => handleNavigate("/security")}
                >
                  Security
                </Button>
              </Box>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold", color: "#ffffff" }}>
                Resources
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Button
                  variant="text"
                  sx={{
                    justifyContent: "flex-start",
                    color: "#B0B0B0",
                    "&:hover": { color: "#FF4C29" },
                  }}
                  onClick={() => handleNavigate("/blog")}
                >
                  Blog
                </Button>
                <Button
                  variant="text"
                  sx={{
                    justifyContent: "flex-start",
                    color: "#B0B0B0",
                    "&:hover": { color: "#FF4C29" },
                  }}
                  onClick={() => handleNavigate("/guides")}
                >
                  Guides
                </Button>
                <Button
                  variant="text"
                  sx={{
                    justifyContent: "flex-start",
                    color: "#B0B0B0",
                    "&:hover": { color: "#FF4C29" },
                  }}
                  onClick={() => handleNavigate("/help")}
                >
                  Help Center
                </Button>
              </Box>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold", color: "#ffffff" }}>
                Company
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Button
                  variant="text"
                  sx={{
                    justifyContent: "flex-start",
                    color: "#B0B0B0",
                    "&:hover": { color: "#FF4C29" },
                  }}
                  onClick={() => handleNavigate("/about")}
                >
                  About Us
                </Button>
                <Button
                  variant="text"
                  sx={{
                    justifyContent: "flex-start",
                    color: "#B0B0B0",
                    "&:hover": { color: "#FF4C29" },
                  }}
                  onClick={() => handleNavigate("/careers")}
                >
                  Careers
                </Button>
                <Button
                  variant="text"
                  sx={{
                    justifyContent: "flex-start",
                    color: "#B0B0B0",
                    "&:hover": { color: "#FF4C29" },
                  }}
                  onClick={() => handleNavigate("/contact")}
                >
                  Contact
                </Button>
              </Box>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold", color: "#ffffff" }}>
                Legal
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Button
                  variant="text"
                  sx={{
                    justifyContent: "flex-start",
                    color: "#B0B0B0",
                    "&:hover": { color: "#FF4C29" },
                  }}
                  onClick={() => handleNavigate("/privacy")}
                >
                  Privacy
                </Button>
                <Button
                  variant="text"
                  sx={{
                    justifyContent: "flex-start",
                    color: "#B0B0B0",
                    "&:hover": { color: "#FF4C29" },
                  }}
                  onClick={() => handleNavigate("/terms")}
                >
                  Terms
                </Button>
                <Button
                  variant="text"
                  sx={{
                    justifyContent: "flex-start",
                    color: "#B0B0B0",
                    "&:hover": { color: "#FF4C29" },
                  }}
                  onClick={() => handleNavigate("/cookies")}
                >
                  Cookies
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, borderColor: "#333333" }} />

          <Box
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}
          >
            <Typography variant="body2" sx={{ color: "#B0B0B0" }}>
              © {new Date().getFullYear()} CryptoTracker. All rights reserved.
            </Typography>

            <Box sx={{ display: "flex", gap: 3 }}>
              <Button
                variant="text"
                sx={{
                  color: "#B0B0B0",
                  "&:hover": { color: "#FF4C29" },
                }}
                onClick={() => handleNavigate("/privacy")}
              >
                Privacy Policy
              </Button>
              <Button
                variant="text"
                sx={{
                  color: "#B0B0B0",
                  "&:hover": { color: "#FF4C29" },
                }}
                onClick={() => handleNavigate("/terms")}
              >
                Terms of Service
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Landing
