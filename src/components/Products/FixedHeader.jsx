import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
    root: {
        width: '100%',
      },
      container: {
        maxHeight: 440,
      },
});

const columns = [
    {id: 'name',name: "メニュー",minWidth: 170},
    {id: 'created',name: "作成日時",minWidth: 250},
    {id: 'updated',name: "更新日時",minWidth: 250},
];

const FixedHeader = (props) => {

    const classes = useStyles();

    const menus = props.menus;

    const dateTime = (time) => {
        return new Date(time*1000).toLocaleDateString()
    };

  return(
    <Paper className={classes.root}>
        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map(column => (
                            <TableCell
                                key={column.id} style={{minWidth: column.minWidth}}
                            >
                                {column.name}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                            {menus.map(menu => {
                                return(
                                    <TableRow key={menu.id}>
                                        <TableCell>
                                            {menu.name}
                                        </TableCell>
                                        <TableCell>
                                            {dateTime(menu.created_at.seconds)}
                                        </TableCell>
                                        <TableCell>
                                            {dateTime(menu.updated_at.seconds)}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
  )
}

export default FixedHeader;