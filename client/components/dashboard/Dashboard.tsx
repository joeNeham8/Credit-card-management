"use client";

import {
    Box,
    SimpleGrid,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Card,
    CardHeader,
    CardBody,
    Icon,
} from "@chakra-ui/react";
import { FaCreditCard, FaDollarSign, FaClock } from "react-icons/fa";

const Dashboard = () => {
    const cards = [
        { bank: "Chase", number: "**** 1234", balance: 2500, limit: 5000 },
        { bank: "Amex", number: "**** 5678", balance: 1200, limit: 3000 },
    ];

    const transactions = [
        { merchant: "Amazon", amount: 120, date: "2025-02-14" },
        { merchant: "Starbucks", amount: 8, date: "2025-02-13" },
    ];

    return (
        <Box p={6}>
            {/* Summary Cards */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                <Card p={4}>
                    <CardHeader display="flex" justifyContent="space-between">
                        <Text fontWeight="bold">Total Balance</Text>
                        <Icon as={FaDollarSign} color="green.500" />
                    </CardHeader>
                    <CardBody>
                        <Text fontSize="2xl" fontWeight="bold">
                            $3,700
                        </Text>
                    </CardBody>
                </Card>

                <Card p={4}>
                    <CardHeader display="flex" justifyContent="space-between">
                        <Text fontWeight="bold">Upcoming Due</Text>
                        <Icon as={FaClock} color="red.500" />
                    </CardHeader>
                    <CardBody>
                        <Text fontSize="2xl" fontWeight="bold">
                            $500
                        </Text>
                    </CardBody>
                </Card>

                <Card p={4}>
                    <CardHeader display="flex" justifyContent="space-between">
                        <Text fontWeight="bold">Cards in Use</Text>
                        <Icon as={FaCreditCard} color="blue.500" />
                    </CardHeader>
                    <CardBody>
                        <Text fontSize="2xl" fontWeight="bold">
                            2
                        </Text>
                    </CardBody>
                </Card>
            </SimpleGrid>

            {/* Credit Cards Table */}
            <Card mt={6} p={4}>
                <CardHeader>
                    <Text fontWeight="bold">Credit Cards</Text>
                </CardHeader>
                <CardBody>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Bank</Th>
                                <Th>Card Number</Th>
                                <Th>Balance</Th>
                                <Th>Limit</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {cards.map((card, index) => (
                                <Tr key={index}>
                                    <Td>{card.bank}</Td>
                                    <Td>{card.number}</Td>
                                    <Td>${card.balance}</Td>
                                    <Td>${card.limit}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </CardBody>
            </Card>

            {/* Transactions Table */}
            <Card mt={6} p={4}>
                <CardHeader>
                    <Text fontWeight="bold">Recent Transactions</Text>
                </CardHeader>
                <CardBody>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Merchant</Th>
                                <Th>Amount</Th>
                                <Th>Date</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {transactions.map((tx, index) => (
                                <Tr key={index}>
                                    <Td>{tx.merchant}</Td>
                                    <Td>${tx.amount}</Td>
                                    <Td>{tx.date}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </CardBody>
            </Card>
        </Box>
    );
};

export default Dashboard;
