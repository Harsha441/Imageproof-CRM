import * as React from 'react';
import { useState, useMemo } from 'react';

import {
  Box,
  Card,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';

/**
 * Words and characters counter example for Material Slate
 */
export default function Counter() {
  // Holds the value of the editor

  // An instance of material editor. It is an slate editor with a few more functions

  // all hot keys, including default and custom hotkeys

  return (
    <Container>
      <Box>
        <Typography variant="h3"> Contract Settings</Typography>
      </Box>

      <Card>
        <Box
          s={12}
          xs={6}
          sx={{
            background: 'white',
            borderRadius: '10px',
            padding: '20px',
            margin: '5px',
          }}
        >
          <FormControl margin="dense" sx={{ m: 1 }}>
            <Box sx={{ marginTop: '30px' }}>
              <FormControl>
                <Box
                  sx={{
                    width: 900,
                    maxWidth: '100%',
                  }}
                >
                  <TextField fullWidth required label="Name" id="Name" size="small" />
                </Box>
              </FormControl>
            </Box>
            <Box
              sx={{
                width: 900,
                maxWidth: '100%',
                marginTop: '10px',
              }}
            >
              <Typography required>Client Signature Fields *</Typography>
              {/* <TextField label="Client Signature Fields" required fullWidth size="small" /> */}
              <TextareaAutosize aria-label="empty textarea" placeholder="Empty" minRows={3} style={{ width: '100%' }} />

              <Typography fontSize={10.5}>
                One line per signer. "Signature:" or "Initial Here:" will be appended automatically. Your client must
                sign in each of these fields before they can electronically sign their contract.
              </Typography>
            </Box>
          </FormControl>
        </Box>
      </Card>
    </Container>
  );
}
