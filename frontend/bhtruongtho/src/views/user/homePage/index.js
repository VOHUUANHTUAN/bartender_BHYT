import { memo, useEffect, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import Carousel from 'react-material-ui-carousel'
import { getGoiBHAPI } from "../../../api/connect";
import React from 'react';
import { Container, Grid, Paper, Typography, Button } from "@mui/material";
import { Card, CardContent, CardMedia, IconButton } from "@mui/material";
import ScrollCarousel from 'scroll-carousel-react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('../../../images/goibaohiem', false, /\.(png|jpe?g|svg)$/));
const imagesHome = importAll(require.context('../../../images/homepage', false, /\.(png|jpe?g|svg)$/));
const HomePage = () => {
    const NextIcon = <ChevronRightIcon fontSize="small" />;
    const PrevIcon = <ChevronLeftIcon fontSize="small" />;
    const [goiBHs, setgoiBHs] = useState([]);
    const fetchData = async () => {
        setgoiBHs(await getGoiBHAPI(localStorage.getItem("token")));
    }
    useEffect(() => {
        fetchData();
    }, []);
    const cardData = [
        {
            id: 1,
            title: 'An Tâm Mỗi Ngày, Bảo Hiểm Đồng Hành',
            description: 'An Tâm Mỗi Ngày, Bảo Hiểm Đồng Hành',
            imageUrl: imagesHome[0],
          },
          {
            id: 2,
            title: 'Bảo Vệ Hạnh Phúc, Mỗi Gia Đình Là Một Chặng Đường An Toàn',
            description: 'This is the description for Card 2.',
            imageUrl: imagesHome[1],
          },
          {
            id: 3,
            title: 'Đối Tác Đáng Tin Cậy, Bảo Hiểm Vì Tương Lai Bạn',
            description: 'This is the description for Card 3.',
            imageUrl: imagesHome[2],
          },
        // Add more card items as needed
      ];
    return (
        <>
         <Carousel
                        autoPlay={true}
                        animation="slide"
                        interval={5000}
                        timeout={500}
                        navButtonsAlwaysVisible={true}
                        navButtonsAlwaysInvisible={false}
                        cycleNavigation={true}
                        indicators={true}
                        navButtonsProps={{
                            style: {
                                backgroundColor: 'rgba(135, 206, 235, 0.5)',
                                borderRadius: 0
                            }
                        }}
                        navButtonsWrapperProps={{
                            style: {
                                bottom: '0',
                                top: 'unset'
                            }
                        }}
                        NextIcon={<IconButton>{NextIcon}</IconButton>}
                        PrevIcon={<IconButton>{PrevIcon}</IconButton>}
                    >
                       {cardData.map((card) => (
        <Grid item key={card.id} xs={12} sm={6} md={4}>
          <Card style={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="400"
                src={card.imageUrl}
                alt={card.title}
                style={{ objectFit: 'cover' }}
              />

              <CardContent
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  padding: '10px',
                }}
              >
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
                //{card.description}
              </Typography> */}
            </CardContent>
          </Card>
        </Grid>
      ))}
                    </Carousel>
            <Container component="main" maxWidth="xl">
                <Paper elevation={3} style={{ padding: '20px', margin: '40px' }}>
                    <div style={{ marginBottom: '16px' }}>
                        <Typography variant="h5">Sản phẩm trực tuyến</Typography>
                        <Typography variant="body1">Mua ngay các gói bảo hiểm chỉ với vài phút!</Typography>
                    </div>
                    <Carousel
                        autoPlay={true}
                        animation="slide"
                        interval={5000}
                        timeout={500}
                        navButtonsAlwaysVisible={true}
                        navButtonsAlwaysInvisible={false}
                        cycleNavigation={true}
                        indicators={true}
                        navButtonsProps={{
                            style: {
                                backgroundColor: 'rgba(135, 206, 235, 0.5)',
                                borderRadius: 0
                            }
                        }}
                        navButtonsWrapperProps={{
                            style: {
                                bottom: '0',
                                top: 'unset'
                            }
                        }}
                        NextIcon={<IconButton>{NextIcon}</IconButton>}
                        PrevIcon={<IconButton>{PrevIcon}</IconButton>}
                    >
                        {goiBHs.map((goiBH, goiBHKey) => (
                            <Card key={goiBHKey} className="carousel-card">
                                <CardMedia
                                    component="img"
                                    image={images[(goiBHKey) % images.length]}
                                    alt={`Gói Bảo Hiểm ${goiBHKey + 1}`}
                                    style={{ width: '100%', height: '70%' }}
                                    title="Card Image"
                                    className="carousel-card-media"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {goiBH.tenGoiBH}
                                    </Typography>
                                </CardContent>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right', marginBottom: '16px' }}>
                                    <Button variant="outlined" component={Link} to={`product/detail/${goiBH.maGoiBH}`} color="primary">
                                        Xem chi tiết
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </Carousel>

                </Paper>


            </Container>
        </>
    );
};

export default memo(HomePage);
