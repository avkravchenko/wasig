import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, ErrorComponent } from "@/shared/ui";
import useFeedFilterOptions from "../model/hooks/useFeedFilterOptions";
import { useFeedFilterStore } from "../model/store";
import { hasActiveFeedFilters } from "../model/selectors";
import { FeedFilters } from "../model/types";
import defaultFilterStateFactory from "../lib/factories/defaultFilterStateFactory";
import { getApiErrorMessage } from "@/shared/api/errors";
import {
  areFiltersEqual,
  buildActiveFilterChips,
  cloneFilters,
} from "../lib/filterUtils";
import ActiveFiltersSection from "./ActiveFiltersSection";
import FeedFilterSection, {
  SECTION_KEYS,
  FeedFilterSectionKey,
} from "./FeedFilterSection";

const TAB_BAR_CLEARANCE = 84;

const FeedFilter = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const { options, isLoading, isError, error } = useFeedFilterOptions();

  const defaults = useFeedFilterStore((state) => state.defaults);
  const setDefaults = useFeedFilterStore((state) => state.setDefaults);

  const applied = useFeedFilterStore((state) => state.applied);
  const applyFilters = useFeedFilterStore((state) => state.applyFilters);

  const [localFilters, setLocalFilters] = useState<FeedFilters>(() =>
    cloneFilters(applied),
  );

  const [isHeaderElevated, setIsHeaderElevated] = useState(false);
  const scrollOffsetRef = useRef(0);

  const patchLocalFilters = useCallback((patch: Partial<FeedFilters>) => {
    setLocalFilters((prev) => ({
      ...prev,
      ...patch,
      ageRange: patch.ageRange ?? prev.ageRange,
      distanceRange: patch.distanceRange ?? prev.distanceRange,
      hobbyIds: patch.hobbyIds ?? prev.hobbyIds,
      meetingGoals: patch.meetingGoals ?? prev.meetingGoals,
      timeSlots: patch.timeSlots ?? prev.timeSlots,
      durations: patch.durations ?? prev.durations,
    }));
  }, []);

  const backendDefaults = useMemo(
    () =>
      options
        ? defaultFilterStateFactory({
            minAge: options.minAge,
            maxAge: options.maxAge,
            maxDistance: options.maxDistance,
          })
        : defaults,
    [defaults, options],
  );

  const activeFilterChips = useMemo(() => {
    return buildActiveFilterChips({
      defaults,
      filters: localFilters,
      options,
      patchFilters: patchLocalFilters,
    });
  }, [defaults, localFilters, options, patchLocalFilters]);

  const bottomSpacing = TAB_BAR_CLEARANCE + insets.bottom;
  const isApplyDisabled = !hasActiveFeedFilters(localFilters, defaults);

  const handleApply = useCallback(() => {
    applyFilters(localFilters);
    navigation.getParent()?.navigate("feed-tab" as never);
  }, [applyFilters, localFilters, navigation]);

  const handleResetAllFilters = useCallback(() => {
    const resetFilters = cloneFilters(defaults);

    setLocalFilters(resetFilters);
    applyFilters(resetFilters);
  }, [applyFilters, defaults]);

  const handleScroll = useCallback((offsetY: number) => {
    const nextIsElevated = offsetY > 0;
    scrollOffsetRef.current = offsetY;

    setIsHeaderElevated((prev) =>
      prev === nextIsElevated ? prev : nextIsElevated,
    );
  }, []);

  const renderSection = useCallback(
    ({ item }: { item: FeedFilterSectionKey }) => (
      <FeedFilterSection
        section={item}
        defaults={defaults}
        filters={localFilters}
        options={options}
        onPatchFilters={patchLocalFilters}
      />
    ),
    [defaults, localFilters, options, patchLocalFilters],
  );

  useEffect(() => {
    if (options && !areFiltersEqual(backendDefaults, defaults)) {
      setDefaults(backendDefaults);
    }
  }, [backendDefaults, defaults, options, setDefaults]);

  useEffect(() => {
    setLocalFilters(cloneFilters(applied));
  }, [applied]);

  useEffect(() => {
    setIsHeaderElevated(
      activeFilterChips.length > 0 && scrollOffsetRef.current > 0,
    );
  }, [activeFilterChips.length]);

  if (isLoading && !options) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1B7EFF" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <ErrorComponent
          title="Не удалось загрузить фильтры"
          description={getApiErrorMessage(error)}
        />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {isHeaderElevated && activeFilterChips.length > 0 ? (
        <View style={styles.floatingHeader}>
          <ActiveFiltersSection
            chips={activeFilterChips}
            elevated
            onResetAll={handleResetAllFilters}
          />
        </View>
      ) : null}
      <FlatList
        data={SECTION_KEYS}
        keyExtractor={(item) => item}
        renderItem={renderSection}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        onScroll={(event) => handleScroll(event.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
        ListHeaderComponent={
          activeFilterChips.length > 0 ? (
            <ActiveFiltersSection
              chips={activeFilterChips}
              hidden={isHeaderElevated}
              onResetAll={handleResetAllFilters}
            />
          ) : null
        }
        ListFooterComponent={
          <View style={[styles.actions, { marginBottom: bottomSpacing }]}>
            <Button
              title="Применить"
              type="secondary"
              size="lg"
              fullWidth
              disabled={isApplyDisabled}
              onPress={handleApply}
            />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  floatingHeader: {
    left: 16,
    position: "absolute",
    right: 16,
    top: 16,
    zIndex: 10,
  },
  container: {
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  actions: {
    paddingTop: 8,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
});

export default FeedFilter;
