import {
  Table,
  Image,
  ScrollArea,
  Stack,
  Text,
  Paper,
  Group,
  Divider,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useCart } from '../_hooks/useCart';

const CartTable: React.FC<{
  cart: any[];
  orderPrice?: any;
  paymentMethod?: string;
}> = ({ cart, orderPrice, paymentMethod }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  let totalPriceInCart;
  if (!orderPrice) {
    const { totalPrice } = useCart();
    totalPriceInCart = totalPrice;
  } else {
    totalPriceInCart = orderPrice;
  }
  const { codCharge } = useCart();

  return (
    <ScrollArea>
      {isMobile ? (
        <Stack>
          {cart.map((item, index) => (
            <Paper key={index} p='md'>
              <Group align='start'>
                <Image
                  src={
                    item.product?.attributes?.banner?.data.attributes.url ||
                    '/images/default.png'
                  }
                  alt={item.product?.attributes?.title || 'Product image'}
                  w={50}
                  h={50}
                  fit='cover'
                />
                <Stack style={{ flex: 1 }}>
                  <Text>{item.product?.attributes?.title}</Text>
                  <Text size='sm'>
                    Price: ₹{item.product?.attributes?.pricing.toFixed(2)}
                  </Text>
                  <Text size='sm'>Qty: {item.quantity}</Text>
                  <Text size='sm'>
                    Total: ₹
                    {(
                      item.product?.attributes?.pricing * item.quantity
                    ).toFixed(2)}
                  </Text>
                </Stack>
              </Group>
            </Paper>
          ))}
          <Divider />
          {paymentMethod === 'cod' && (
            <Group>
              <Text>COD Charge:</Text>
              <Text>₹{codCharge || 100}</Text>
            </Group>
          )}
          <Group style={{ fontWeight: 'bold', fontSize: '16px' }}>
            <Text>Total Price:</Text>
            <Text>
              ₹
              {paymentMethod === 'cod'
                ? Number(totalPriceInCart) + (codCharge || 100)
                : totalPriceInCart}
            </Text>
          </Group>
        </Stack>
      ) : (
        <Table withRowBorders={false} withColumnBorders={false} mt='md'>
          <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              <Table.Th>Item</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Total</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {cart.map((item, index) => (
              <Table.Tr key={index}>
                <Table.Td>
                  <Image
                    src={
                      item.product?.attributes?.banner?.data.attributes.url ||
                      '/images/default.png'
                    }
                    alt={item.product?.attributes?.title || 'Product image'}
                    w={50}
                    h={50}
                    fit='cover'
                  />
                </Table.Td>
                <Table.Td>{item.product?.attributes?.title}</Table.Td>
                <Table.Td>
                  ₹{item.product?.attributes?.pricing.toFixed(2)}
                </Table.Td>
                <Table.Td>{item.quantity}</Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>
                  ₹
                  {(item.product?.attributes?.pricing * item.quantity).toFixed(
                    2
                  )}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
          <Table.Tfoot>
            {paymentMethod === 'cod' && (
              <Table.Tr>
                <Table.Td colSpan={4} style={{ textAlign: 'right' }}>
                  COD Charge:
                </Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>
                  ₹{codCharge || 100}
                </Table.Td>
              </Table.Tr>
            )}
            <Table.Tr>
              <Table.Td
                colSpan={4}
                style={{ textAlign: 'right', fontWeight: 'bold' }}
              >
                Total Price:
              </Table.Td>
              <Table.Td style={{ fontWeight: 'bold', textAlign: 'right' }}>
                ₹
                {paymentMethod === 'cod'
                  ? Number(totalPriceInCart) + (codCharge || 100)
                  : totalPriceInCart}
              </Table.Td>
            </Table.Tr>
          </Table.Tfoot>
        </Table>
      )}
    </ScrollArea>
  );
};

export default CartTable;
