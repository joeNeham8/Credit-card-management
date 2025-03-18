"use client";

import {
    Avatar,
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
    Progress,
    Flex,
    VStack,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import { FaCreditCard, FaDollarSign, FaClock } from "react-icons/fa";

// Simulated User Data (Replace with API/Auth Data)
const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    profilePic: "https://i.pravatar.cc/100",
    totalBalance: 3700,
    upcomingDue: 500,
    cards: [
        { bank: "Chase", number: "**** 1234", balance: 2500, limit: 5000 },
        { bank: "Amex", number: "**** 5678", balance: 1200, limit: 3000 },
    ],
    transactions: [
        { merchant: "Amazon", amount: 120, date: "2025-02-14" },
        { merchant: "Starbucks", amount: 8, date: "2025-02-13" },
    ],
};

const Dashboard = () => {
    return (
        <Grid 
            templateColumns={{ base: "1fr", md: "1fr 3fr" }} 
            gap={6} 
            p={6} 
            bg="gray.50" 
            minH="100vh"
        >
            {/* Left Column: User Profile */}
            <GridItem>
                <Card p={6} shadow="lg" borderRadius="lg" bg="white">
                    <VStack align="center" spacing={4}>
                        <Avatar size="xl" name={user.name} src={user.profilePic} />
                        <Text fontSize="xl" fontWeight="bold">{user.name}</Text>
                        <Text fontSize="sm" color="gray.500">{user.email}</Text>
                    </VStack>
                </Card>
            </GridItem>

            {/* Right Column: Main Content */}
            <GridItem>
                {/* Summary Cards */}
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
                    <Card p={4} shadow="lg" borderRadius="lg" bg="white">
                        <CardHeader display="flex" justifyContent="space-between">
                            <Text fontWeight="bold">Total Balance</Text>
                            <Icon as={FaDollarSign} color="green.500" />
                        </CardHeader>
                        <CardBody>
                            <Text fontSize="2xl" fontWeight="bold" color="green.600">
                                ${user.totalBalance}
                            </Text>
                        </CardBody>
                    </Card>

                    <Card p={4} shadow="lg" borderRadius="lg" bg="white">
                        <CardHeader display="flex" justifyContent="space-between">
                            <Text fontWeight="bold">Upcoming Due</Text>
                            <Icon as={FaClock} color="red.500" />
                        </CardHeader>
                        <CardBody>
                            <Text fontSize="2xl" fontWeight="bold" color="red.600">
                                ${user.upcomingDue}
                            </Text>
                        </CardBody>
                    </Card>

                    <Card p={4} shadow="lg" borderRadius="lg" bg="white">
                        <CardHeader display="flex" justifyContent="space-between">
                            <Text fontWeight="bold">Cards in Use</Text>
                            <Icon as={FaCreditCard} color="blue.500" />
                        </CardHeader>
                        <CardBody>
                            <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                                {user.cards.length}
                            </Text>
                        </CardBody>
                    </Card>
                </SimpleGrid>

                {/* Credit Cards Table */}
                <Card p={4} shadow="lg" borderRadius="lg" bg="white" mb={6}>
                    <CardHeader>
                        <Text fontWeight="bold">Your Credit Cards</Text>
                    </CardHeader>
                    <CardBody overflowX="auto">
                        <Table variant="simple">
                            <Thead bg="gray.100">
                                <Tr>
                                    <Th>Bank</Th>
                                    <Th>Card Number</Th>
                                    <Th>Balance</Th>
                                    <Th>Limit</Th>
                                    <Th>Utilization</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {user.cards.map((card, index) => {
                                    const utilization = (card.balance / card.limit) * 100;
                                    return (
                                        <Tr key={index}>
                                            <Td>{card.bank}</Td>
                                            <Td>{card.number}</Td>
                                            <Td fontWeight="bold" color={utilization > 80 ? "red.500" : "green.500"}>
                                                ${card.balance}
                                            </Td>
                                            <Td>${card.limit}</Td>
                                            <Td width="200px">
                                                <Progress 
                                                    value={utilization} 
                                                    colorScheme={utilization > 80 ? "red" : "green"} 
                                                    size="sm" 
                                                    borderRadius="md" 
                                                />
                                                <Text fontSize="sm" textAlign="center" mt={1}>
                                                    {utilization.toFixed(1)}%
                                                </Text>
                                            </Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </CardBody>
                </Card>

                {/* Transactions Table */}
                <Card p={4} shadow="lg" borderRadius="lg" bg="white">
                    <CardHeader>
                        <Text fontWeight="bold">Recent Transactions</Text>
                    </CardHeader>
                    <CardBody overflowX="auto">
                        <Table variant="simple">
                            <Thead bg="gray.100">
                                <Tr>
                                    <Th>Merchant</Th>
                                    <Th>Amount</Th>
                                    <Th>Date</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {user.transactions.map((tx, index) => (
                                    <Tr key={index} _hover={{ bg: "gray.50" }}>
                                        <Td>{tx.merchant}</Td>
                                        <Td fontWeight="bold">${tx.amount}</Td>
                                        <Td>{tx.date}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </CardBody>
                </Card>
            </GridItem>
        </Grid>
    );
};

export default Dashboard;
