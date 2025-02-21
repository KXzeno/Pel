export interface EnclaveData {
  id: `E${number}`;
  name: string;
  [index: `${number}C${number}` | `${number}C${number}:${number}`]: object;
}

export const defaultData: EnclaveData[] = [
  {
    id: 'E1',
    name: 'PowerShell',
    '1C1': {
      data: { value: 'sup', },
      T1: { data:{}, },
      '2C1:1': { data: {}, T1: { data: {}, }, T2: { data: {}, }, },
      '2C2:1': { data:{}, T1: { data: {}, }, '3C1:2': { data: {}, }, },
    }
  },
  {
    id: 'E2',
    name: 'Vim/Neovim',
    '1C1': {
      data: { value: 'sup', },
      T1: { data:{}, },
      '2C1:1': { data: {}, T1: { data: {}, }, T2: { data: {}, }, },
      '2C2:1': { data:{}, T1: { data: {}, }, '3C1:2': { data: {}, }, },
    }
  },
  {
    id: 'E3',
    name: 'Starcraft II',
    '1C1': {
      data: { value: 'sup', },
      T1: { data:{}, },
      '2C1:1': { data: {}, T1: { data: {}, }, T2: { data: {}, }, },
      '2C2:1': { data:{}, T1: { data: {}, }, '3C1:2': { data: {}, }, },
    }
  },
  {
    id: 'E4',
    name: 'Field Notes',
    '1C1': {
      data: { value: 'sup', },
      T1: { data:{}, },
      '2C1:1': { data: {}, T1: { data: {}, }, T2: { data: {}, }, },
      '2C2:1': { data:{}, T1: { data: {}, }, '3C1:2': { data: {}, }, },
    }
  },
  {
    id: 'E5',
    name: 'Project - Karnovah',
    '1C1': {
      data: { value: 'sup', },
      T1: { data:{}, },
      '2C1:1': { data: {}, T1: { data: {}, }, T2: { data: {}, }, },
      '2C2:1': { data:{}, T1: { data: {}, }, '3C1:2': { data: {}, }, },
    }
  },
];
