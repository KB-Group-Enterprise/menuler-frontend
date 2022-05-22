import { computed, reactive, readonly, watch, ref } from 'vue';
import { utils } from '@/utils';
import { GlobalKey } from '@/symbols/symbol';
import { injectStrict } from '@/utils/injectStrict';
import { isAfter, Duration, intervalToDuration, isBefore, sub } from 'date-fns';

type GlobalState = {
  currentDateTime?: Date;
  IntervalRef?: number;
  isModalOpen: boolean;
  modalContent?: any;
  modalComponent?: any;
  isSidebarOpen?: boolean;
};

const _state = reactive<GlobalState>({
  currentDateTime: new Date(),
  IntervalRef: undefined,
  isModalOpen: false,
  modalContent: null,
  modalComponent: null,
  isSidebarOpen: false,
});

// setter
function setState(payload: Partial<typeof _state>) {
  Object.entries(payload).forEach(([key, value]) => {
    if (utils.hasKey(_state, key)) {
      (_state as any)[key] = value;
    } else {
      console.error(`[setState] key "${key}" does not exist in state.`);
    }
  });
}

function mutateState(mutator: (state: typeof _state) => void) {
  try {
    mutator(_state);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export const global = {
  state: readonly(_state),
  setState,
  mutateState,
};

export function useGlobal() {
  if (!_state.IntervalRef) {
    const interval = setGlobalInterval();
    setState({
      IntervalRef: interval,
    });
  }
  return injectStrict(GlobalKey);
}

export function setGlobalInterval() {
  const interval = setInterval(function () {
    setState({
      currentDateTime: new Date(),
    });
  }, 1000);
  return interval;
}

export function countdownFunction(date: string) {
  const result = ref<Duration | any>(null);
  const trigger = computed(() => _state.currentDateTime);

  watch(trigger, () => {
    const inputDate = new Date(date);
    const currentDateTime = new Date();
    if (isAfter(currentDateTime, inputDate)) {
      result.value = false;
    } else {
      result.value = intervalToDuration({ start: currentDateTime, end: inputDate });
    }
  });
  return result;
}

export function beforeTimeOut(date: string, second: number) {
  const result = ref<boolean>(false);
  const trigger = computed(() => _state.currentDateTime);

  watch(trigger, () => {
    const before = new Date(date);
    const after = sub(before, {
      seconds: second,
    });
    const currentDateTime = new Date();
    if (isAfter(currentDateTime, after) && isBefore(currentDateTime, before)) {
      result.value = true;
    } else {
      result.value = false;
    }
  });
  return result;
}

export function afterTime(date: string) {
  const result = ref<boolean>(false);
  const trigger = computed(() => _state.currentDateTime);

  watch(trigger, () => {
    const currentDateTime = new Date();
    if (isAfter(currentDateTime, new Date(date))) {
      result.value = true;
    } else {
      result.value = false;
    }
  });
  return result;
}

export function closeSideBar() {
  setState({
    isSidebarOpen: false,
  });
}
