import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import seeder from '../database/seeder/GetSiteMetaData-response.json';

const Home = ({navigation, route, database}) => {
    const [listPIC, setListPIC] = React.useState([]);
    const [totalRecord, setTotalRecord] = React.useState(0);

    const subscribeList = db => {
        const picCollection = db.objects('PersonInCharge');
        function listener(pic, changes) {
            // console.log('changes in listener', changes);
            setListPIC(pic);
            setTotalRecord(pic.length);

            // Update UI in response to inserted objects
            changes.insertions.forEach(index => {
                let insertedPIC = pic[index];
                //console.log('insertedPIC', insertedPIC);
            });

            // Update UI in response to modified objects
            changes.modifications.forEach(index => {
                let modifiedPIC = pic[index];
                //console.log('modifiedPIC', modifiedPIC);
            });

            // Update UI in response to deleted objects
            changes.deletions.forEach(index => {
                // Deleted objects cannot be accessed directly
                // Support for accessing deleted objects coming soon...
                // console.log('deleted');
            });
        }
        picCollection.addListener(listener);

        return [picCollection, listener];
    };

    React.useEffect(() => {
        const sub = subscribeList(database);
        return () => {
            console.log('UNMOUNTED', sub[0].length);
            sub[0].removeListener(sub[1]);
            database.removeAllListeners();
        };
    }, [database]);

    const clear = db => {
        db.write(() => {
            db.deleteAll();
        });
    };

    const generate = (db, seeder) => {
        const t0 = Date.now();
        function collectionPIC(pic, index) {
            const picCollection = db.objects('PersonInCharge');
            let id = picCollection.length + 1;
            if(pic){
                return {
                    _id: id + index,
                    siteShortName: 'adr',
                    userId: pic.userId,
                    fullName: pic.fullName,
                    position: pic.position || (id + index).toString(),
                    createdAt: new Date(),
                    isDeleted: false,
                };
            }
            else{
                return {
                    _id: id + index,
                    siteShortName: 'adr',
                    userId: id + index,
                    fullName: (id + index).toString(),
                    position: (id + index).toString(),
                    createdAt: new Date(),
                    isDeleted: false,
                };
            }

        }
        try {
            // const arrayPIC = seeder.map((item, index) => collectionPIC(item, index));
            const arrayPIC = [...Array(10000).keys()].map((item, index) => collectionPIC(null, index));
            let result = false;
            db.write(() => {
                result = arrayPIC.map(pic => db.create('PersonInCharge', pic));
            });

            console.log('result', result.length);
        } catch (e) {
            console.log('error', e);
        }
        const t1 = Date.now();
        console.log('Call to generate data realm took ' + (t1 - t0) + ' milliseconds.');
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text>Dummy Screen</Text>
                <TouchableOpacity
                    onPress={() => generate(database, seeder.personInCharge)}
                    style={styles.generateButton}>
                    <Text>Generate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => clear(database)}
                    style={styles.clearButton}>
                    <Text>Clear</Text>
                </TouchableOpacity>
                <Text>Total Record: {totalRecord}</Text>
                <FlatList
                    data={listPIC}
                    renderItem={item => (
                        <View>
                            <Text>
                                {item.item._id} - {item.item.fullName}
                            </Text>
                        </View>
                    )}
                    keyExtractor={item => item._id.toString()}
                />
                <View>
                    <Text>End of Screen</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    generateButton: {
        backgroundColor: '#4285F4',
        padding: 10,
        marginTop: 10,
    },
    clearButton: {
        backgroundColor: '#DB4437',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default Home;
