import { Grid } from "@mui/material";
import { Product } from "../../../App/Models/Product";
import ProductCard from "../ProductCard/ProductCard";

interface Props {
    products: Product[]
}
export default function ProductList({ products }: Props) {
    return (
        <Grid container spacing={6}>
            {products?.map(
                (product) =>
                (
                    <Grid item xs={4} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))
            }
        </Grid>)
}