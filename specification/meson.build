rnv = find_program('rnv')

# Validate the RelaxNG Compact schemas.
# In order to validate a particular XML AppData file snippet against the
# schemas, use `rnv -q oars-1.1.rnc ${my_file}` or pass it on stdin.
test('oars-1.0-rnc-check', rnv,
  args : ['-c', 'oars-1.0.rnc'],
)
test('oars-1.1-rnc-check', rnv,
  args : ['-c', 'oars-1.1.rnc'],
)
