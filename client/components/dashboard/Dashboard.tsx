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
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import {
    FaCreditCard,
    FaDollarSign,
    FaClock,
    FaPlus,
    FaTrash,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { db, auth } from "../../src/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import AddCard from "../globals/addcard/AddCard";

const Dashboard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [cards, setCards] = useState([]);
    const [userId, setUserId] = useState(null);

    // Fetch user ID
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // Fetch cards when userId is available
    useEffect(() => {
        if (!userId) return;

        const fetchCards = async () => {
            try {
                const querySnapshot = await getDocs(
                    collection(db, "users", userId, "cards")
                );

                const cardData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCards(cardData);
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };

        fetchCards();
    }, [userId]);

    const handleDeleteCard = async (cardId) => {
        if (!userId) return;

        try {
            await deleteDoc(doc(db, "users", userId, "cards", cardId));
            setCards(cards.filter((card) => card.id !== cardId)); // Update UI after deletion
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    return (
        <Grid
            templateColumns={{ base: "2fr", md: "1fr 3fr" }}
            gap={6}
            p={6}
            bg="gray.50"
            minH="100vh"
        >
            {/* Left Column: User Profile */}
            <GridItem>
                <Card p={6} shadow="lg" borderRadius="lg" bg="white">
                    <VStack align="center" spacing={4}>
                        <Avatar
                            size="xl"
                            name="John Doe"
                            src="https://i.pravatar.cc/100"
                        />
                        <Text fontSize="xl" fontWeight="bold">
                            John Doe
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                            johndoe@example.com
                        </Text>
                    </VStack>
                </Card>
            </GridItem>

            {/* Right Column: Main Content */}
            <GridItem>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
                    <Card p={4} shadow="lg" borderRadius="lg" bg="white">
                        <CardHeader
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Text fontWeight="bold">Total Balance</Text>
                            <Icon as={FaDollarSign} color="green.500" />
                        </CardHeader>
                        <CardBody>
                            <Text
                                fontSize="2xl"
                                fontWeight="bold"
                                color="green.600"
                            >
                                $3700
                            </Text>
                        </CardBody>
                    </Card>

                    <Card p={4} shadow="lg" borderRadius="lg" bg="white">
                        <CardHeader
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Text fontWeight="bold">Upcoming Due</Text>
                            <Icon as={FaClock} color="red.500" />
                        </CardHeader>
                        <CardBody>
                            <Text
                                fontSize="2xl"
                                fontWeight="bold"
                                color="red.600"
                            >
                                $500
                            </Text>
                        </CardBody>
                    </Card>

                    <Card p={4} shadow="lg" borderRadius="lg" bg="white">
                        <CardHeader
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Text fontWeight="bold">Cards in Use</Text>
                            <Icon as={FaCreditCard} color="blue.500" />
                        </CardHeader>
                        <CardBody>
                            <Text
                                fontSize="2xl"
                                fontWeight="bold"
                                color="blue.600"
                            >
                                {cards.length}
                            </Text>
                        </CardBody>
                    </Card>
                </SimpleGrid>

                <Card p={4} shadow="lg" borderRadius="lg" bg="white" mb={6}>
                    <CardHeader display="flex" justifyContent="space-between">
                        <Text fontWeight="bold">Your Credit Cards</Text>
                        <Button
                            leftIcon={<FaPlus />}
                            colorScheme="blue"
                            onClick={onOpen}
                        >
                            Add New Card
                        </Button>
                    </CardHeader>
                    <CardBody overflowX="auto">
                        <Table variant="simple">
                            <Thead bg="gray.100">
                                <Tr>
                                    <Th>Bank Name</Th>
                                    <Th>Card Number</Th>
                                    <Th>Balance</Th>
                                    <Th>Expiry Date</Th>
                                    {/* <Th>Limit</Th> */}
                                    <Th>Utilization</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {cards.length > 0 ? (
                                    cards.map((card) => (
                                        <Tr key={card.id}>
                                            <Td>
                                                <Avatar
                                                    src={card.bankLogo}
                                                    size="sm"
                                                    name={card.bankName} // Fallback text if the image fails
                                                    mr={2} // Adds spacing between logo and bank name
                                                />
                                                {card.bank}
                                            </Td>
                                            <Td>
                                                **** {card.cardNumber.slice(-4)}
                                            </Td>
                                            <Td
                                                fontWeight="bold"
                                                color={
                                                    card.balance > 0
                                                        ? "green.500"
                                                        : "red.500"
                                                }
                                            >
                                                ${card.balance}
                                            </Td>
                                            <Td>{card.expiryDate}</Td>{" "}
                                            {/* <Td>${card.limit}</Td> */}
                                            <Td width="200px">
                                                <Progress
                                                    value={
                                                        (card.balance /
                                                            card.limit) *
                                                        100
                                                    }
                                                    colorScheme="green"
                                                    size="sm"
                                                    borderRadius="md"
                                                />
                                                <Text
                                                    fontSize="sm"
                                                    textAlign="center"
                                                    mt={1}
                                                >
                                                    {(
                                                        (card.balance /
                                                            card.limit) *
                                                        100
                                                    ).toFixed(0)}
                                                    %
                                                </Text>
                                            </Td>
                                            {/* Delete Button */}
                                            <Td>
                                                <Button
                                                    colorScheme="red"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDeleteCard(
                                                            card.id
                                                        )
                                                    }
                                                >
                                                    <Icon as={FaTrash} />
                                                </Button>
                                            </Td>
                                        </Tr>
                                    ))
                                ) : (
                                    <Tr>
                                        <Td colSpan={5} textAlign="center">
                                            No cards available
                                        </Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </CardBody>
                </Card>

                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent maxW="800px" width="100%">
                        <ModalHeader>Add New Card</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <AddCard onClose={onClose} userId={userId} />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </GridItem>
        </Grid>
    );
};

export default Dashboard;
