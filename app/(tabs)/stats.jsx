import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import useMoodStore from '../../hooks/useMoodStore';

// Map moods to emoji
const emojiMap = {
  happy: "😊",
  neutral: "😐",
  sad: "😢",
  angry: "😡",
  tired: "😴",
};

export default function StatsScreen() {
  const { moods } = useMoodStore();
  const allMoods = Object.keys(emojiMap);
  const moodCounts = allMoods.map(mood =>
    moods.filter(entry => entry.mood === mood).length
  );

  const total = moods.length;
  const moodPercentages = moodCounts.map(count =>
    total > 0 ? Math.round((count / total) * 100) : 0
  );

  const chartData = {
    labels: allMoods.map(mood => emojiMap[mood]),
    datasets: [{ data: moodPercentages }],
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>
          📊 Mood Statistics
        </Text>

        {total > 0 ? (
          <View style={styles.statsContainer}>
            <View style={styles.chartWrapper}>
              <BarChart
                data={chartData}
                width={screenWidth - 50}
                height={220}
                fromZero
                yAxisSuffix="%"
                yAxisInterval={20}
                segments={5}
                chartConfig={{
                  backgroundGradientFrom: '#6a11cb',
                  backgroundGradientTo: '#2575fc',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  barPercentage: 0.5,
                  propsForVerticalLabels: { fontSize: 20 },
                  propsForBackgroundLines: { stroke: 'rgba(255,255,255,0.1)' },
                }}
                style={styles.chart}
                withInnerLines
                yLabelsOffset={10}
              />
            </View>

            <View style={styles.statsCards}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{total}</Text>
                <Text style={styles.statLabel}>Total Entries</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{allMoods.length}</Text>
                <Text style={styles.statLabel}>Different Moods</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No mood entries yet</Text>
            <Text style={styles.emptySubtext}>
              Start logging your moods to see statistics
            </Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 80,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 24,
  },
  statsContainer: { flex: 1 },
  chartWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 20,
    elevation: 6,
    alignItems: 'center',
    marginBottom: 24,
  },
  chart: {
    borderRadius: 16,
  },
  statsCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statValue: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtext: {
    color: 'rgba(200, 200, 200, 0.7)',
    fontSize: 14,
    textAlign: 'center',
  },
});
