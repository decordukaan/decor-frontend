import { Table, Image, ScrollArea } from '@mantine/core';
import { useCart } from '../_hooks/useCart';

const CartTable: React.FC<{ cart: any[] }> = ({ cart }) => {

  const {totalPrice} = useCart()

  const rows = cart.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <Image
          src={item.product?.attributes?.banner?.data.attributes.url || ''}
          alt={item.product?.attributes?.title || 'Product image'}
          w={'50px'}
          h={'50px'}
          fit='cover'
        />
      </Table.Td>
      <Table.Td>{item.product?.attributes?.title}</Table.Td>
      <Table.Td>₹{item.product?.attributes?.pricing.toFixed(2)}</Table.Td>
      <Table.Td>{item.quantity}</Table.Td>
      <Table.Td style={{ textAlign: 'right' }}>
        ₹{(item.product?.attributes?.pricing * item.quantity).toFixed(2)}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
    <Table withRowBorders={false} withColumnBorders={false}  mt='md'>
      <Table.Thead>
        <Table.Tr>
          <Table.Th></Table.Th>
          <Table.Th>Item</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Quantity</Table.Th>
          <Table.Th style={{textAlign:"right"}}>Total</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Tfoot>
        <Table.Tr>
          <Table.Td
            colSpan={4}
            style={{ textAlign: 'right', fontWeight: 'bold' }}
          >
            Total Price:
          </Table.Td>
          <Table.Td style={{ fontWeight: 'bold',textAlign:"right" }}>
            ₹{totalPrice.toFixed(2)}
          </Table.Td>
        </Table.Tr>
      </Table.Tfoot>
    </Table>
    </ScrollArea>
  );
};

export default CartTable;
