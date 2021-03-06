import React, { useEffect, useState } from "react";
import firebase from "../../firebase";
import {
  ChakraProvider,
  Container,
  Box,
  Flex,
  Text,
  Tag,
} from "@chakra-ui/react";
import styles from "../css/transfer_list.module.scss";
import Header from "../components/Header";
import supabase from "../../supabase";

const TransferList = () => {
  const db = firebase.firestore();

  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const transferResponse = await db
      //   .collection("ledger")
      //   .orderBy("date", "desc")
      //   .limit(10)
      //   .get();
      // const transferParse = transferResponse.docs.map((account) =>
      //   account.data()
      // );

      let { data: transferParse, error } = await supabase
        .from("ledger")
        .select(`*, account(name)`)
        .order("id", { ascending: false });

      setTransfers(transferParse);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      {transfers.map((transfer) => (
        <>
          <div className={styles.transfer_row}>
            {transfer.to && (
              <div className={styles.coin_profile}>
                <img
                  src={`https://avatars.dicebear.com/api/gridy/${transfer.to}.svg`}
                  width="30px"
                />
              </div>
            )}
            <div className={styles.transfer_name_group}>
              <h1 className={styles.transfer_name}>{transfer.account.name}</h1>
              <h1 className={styles.transfer_date}>{transfer.date}</h1>
            </div>

            {transfer.to !== 10 ? (
              <h1 className={styles.transfer_amount_debit}>
                -{transfer.amount}
              </h1>
            ) : (
              <h1 className={styles.transfer_amount_credit}>
                +{transfer.amount}
              </h1>
            )}
          </div>
        </>
      ))}
    </div>
  );
};

export default TransferList;
