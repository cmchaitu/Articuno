import { Box, CircularProgress, Divider, Grid, ImageListItem, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../App/api/agent";
import NotFound from "../../App/Errors/NotFound";
import LoadingComponent from "../../App/layout/LoadingComponent";
import { Product } from "../../App/Models/Product";

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const [product, setproduct] = useState<Product | null>(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        agent.catalog.details(id)
            .then(response => setproduct(response))
            .catch((error) => console.log(error))
            .finally(() => setloading(false))
    }, [id])
    const [progress, setProgress] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);
    if (loading) return (<LoadingComponent />)
    //if (!product) return <Typography sx={{ textAlign: 'center', mt: 20 }} variant="h6" color='primary'>
    //    Product not found..</Typography>
    if (!product) return <NotFound />
    return (
        <>

            <Typography sx={{ textAlign: 'center', mt: 20 }} variant="h4" color='primary'>
                {product.name}</Typography>
            <Grid sx={{ mt: 2 }} container spacing={0}>

                <Grid item xs={2}>
                    <ImageListItem key={product.id} sx={{ width: '500', height: '500' }}>
                        <img
                            src={product.pictureUrl}
                            alt={product.name}
                            loading="lazy"
                        />
                    </ImageListItem>
                </Grid>
                <Divider orientation="vertical" flexItem>
                    Details
                </Divider>
                <Grid item xs={8}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">

                        <TableBody sx={{ align: 'center' }}>
                            <TableRow

                            >
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Brand</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Price</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Description</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">QuantityinStock</TableCell>
                            </TableRow>
                            <TableRow
                                key={product.id}

                            >

                                <TableCell align="center">{product.brand}</TableCell>
                                <TableCell align="center">{product.price / 100}$</TableCell>
                                <TableCell align="center">{product.description}</TableCell>
                                <TableCell align="center">{product.quantityInStock}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </>
    );
}