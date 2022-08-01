import { gql } from "@apollo/client"

export const FIND_UNIQUE_SCHEDULE = gql`
	query(
		$where: ScheduleWhereUniqueInput!
	){
		findUniqueSchedule(
			where: $where
		){
			id
			createdAt
			updatedAt
			day
			startTime
			endTime
			allTime
			dayOff
		}
	}
`
export const FIND_FIRST_SCHEDULE = gql`
	query(
		$where: ScheduleWhereInput
		$orderBy: [ScheduleOrderByWithRelationInput]
		$cursor: ScheduleWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [ScheduleScalarFieldEnum]
	){
		findFirstSchedule(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		){
			id
			createdAt
			updatedAt
			day
			startTime
			endTime
			allTime
			dayOff
		}
	}
`
export const FIND_MANY_SCHEDULE = gql`
	query(
		$where: ScheduleWhereInput
		$orderBy: [ScheduleOrderByWithRelationInput]
		$cursor: ScheduleWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [ScheduleScalarFieldEnum]
	){
		findManySchedule(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		){
			id
			createdAt
			updatedAt
			day
			startTime
			endTime
			allTime
			dayOff
		}
	}
`
export const CREATE_ONE_SCHEDULE = gql`
	mutation(
		$data: ScheduleCreateInput!
	){
		createOneSchedule(
			data: $data
		){
			id
			createdAt
			updatedAt
			day
			startTime
			endTime
			allTime
			dayOff
		}
	}
`
export const UPDATE_ONE_SCHEDULE = gql`
	mutation(
		$data: ScheduleUpdateInput!
		$where: ScheduleWhereUniqueInput!
	){
		updateOneSchedule(
			data: $data
			where: $where
		){
			id
			createdAt
			updatedAt
			day
			startTime
			endTime
			allTime
			dayOff
		}
	}
`
export const DELETE_ONE_SCHEDULE = gql`
	mutation(
		$where: ScheduleWhereUniqueInput!
	){
		deleteOneSchedule(
			where: $where
		){
			id
			createdAt
			updatedAt
			day
			startTime
			endTime
			allTime
			dayOff
		}
	}
`
export const UPSERT_ONE_SCHEDULE = gql`
	mutation(
		$where: ScheduleWhereUniqueInput!
		$create: ScheduleCreateInput!
		$update: ScheduleUpdateInput!
	){
		upsertOneSchedule(
			where: $where
			create: $create
			update: $update
		){
			id
			createdAt
			updatedAt
			day
			startTime
			endTime
			allTime
			dayOff
		}
	}
`