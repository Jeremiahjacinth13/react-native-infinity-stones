import React from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {Project, RootStackParamList} from '../types';
import {PageContainer, ProjectContainer} from '../components';

import PROJECTS from '../projects';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({}: Props) => {
  const _renderItem: ListRenderItem<Project> = ({item}) => (
    <ProjectContainer {...item} />
  );

  return (
    <PageContainer>
      <FlatList data={PROJECTS} renderItem={_renderItem} />
    </PageContainer>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
